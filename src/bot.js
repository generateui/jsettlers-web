import { ClientRandom } from "./random";
import { BuildTown } from "./actions/buildTown";
import { BuildRoad } from "./actions/buildRoad";
import { RollDice } from "./actions/rollDice";
import { LooseResources } from "./actions/looseResources";
import { MoveRobber } from "./actions/moveRobber";
import { RobPlayer } from "./actions/robPlayer";
import { EndTurn } from "./actions/endTurn";
import { ResourceList } from "./resource";
import { RejectOffer } from "./actions/rejectOffer";

export class BotDescriptor {
    constructor(config) {
        this.name = config.name;
        this.description = config.description;
        this.createFunction = config.createFunction;
    }
    createNamedInstance(name) {
        if (name === undefined) {
            const random = new ClientRandom();
            const index = random.intFromZero(BotNames.names.length);
            name = "🤖 " + BotNames.names[index];
        }
        return new BotDescriptor({
            name: name,
            description: this.description,
            createFunction: this.createFunction
        });
    }
}

export class BotNames {
    static get names() {
        return [
            "Spark",
            "Mach",
            "Tin",
            "Silver",
            "Scrappy",
            "Rust",
            "Core",
            "Cybel",
            "Cyb",
            "Prime",
            "Dusty",
            "Oneroid",
            "R2D3",
            "C-4PO",
            "IG-87", // maybe use this one for really good bots :P
            "BD-3001",
        ]
    }
}

export class Bot {
    constructor(host, game, player) {
        this.host = host;
        this.game = game;
        this.player = player;
        this.random = new ClientRandom();
        this.actionAddedHandler = game.actions.added((action) => {
            this.maybeAct(action);
        });
        this.handledOfferIds = new Set();


        this.buildTown = new BuildTown({ player: player });
        this.buildRoad = new BuildRoad({ player: player });
        this.rollDice = new RollDice({ player: player });
        this.looseResources = new LooseResources({ player: player });
        this.moveRobber = new MoveRobber({ player: player });
        this.robPlayer = new RobPlayer({ player: player });
        this.endTurn = new EndTurn({ player: player });
        this.rejectOffer = new RejectOffer({ player: player });
    }
    static get descriptor() {
        return new BotDescriptor({
            name: "VeryLazy",
            description: "I'm lazy. Very lazy. As lazy as possible.", 
            createFunction: (host, game, player) => new Bot(host, game, player)
        });
    }
    maybeAct(action) {
        if (this.game.phase === this.game.initialPlacement) {
            if (this.game.expectation.matches(this.buildTown)) {
                const possibilities = this.game.initialPlacement.townPossibilities(this.game, this.player);
                const index = this.random.intFromZero(possibilities.length);
                const node = possibilities[index];
                const bt = new BuildTown({ player: this.player, node: node });
                this.host.send(bt);
            }
            if (this.game.expectation.matches(this.buildRoad)) {
                const possibilities = this.game.initialPlacement.roadPossibilities(this.game, this.player);
                const index = this.random.intFromZero(possibilities.length);
                const edge = possibilities[index];
                const br = new BuildRoad({ player: this.player, edge: edge });
                this.host.send(br);
            }
        }
        if (this.game.expectation.matches(this.rollDice)) {
            const rollDice = new RollDice({ player: this.player });
            this.host.send(rollDice);
        }
        if (this.game.expectation.matches(this.endTurn)) {
            const endTurn = new EndTurn({ player: this.player });
            this.host.send(endTurn);
        }
        if (this.game.expectation.matches(this.rejectOffer)) {
            const offer = game.expectation.offer;
            if (!this.handledOfferIds.has(offer.id)) {
                this.handledOfferIds.add(offer.id);
                const rejectOffer = new RejectOffer({
                    player: this.player,
                    tradeOffer: offer
                });
                this.host.send(rejectOffer);
            }
        }
        if (this.game.expectation.matches(this.moveRobber)) {
            const possibilities = [];
            const robberCoord = this.game.board.robber.coord;
            for (let hex of this.game.board.hexes.values()) {
                if (hex.canHaveRobber && hex.coord !== robberCoord) {
                    possibilities.push(hex.coord);
                }
            }
            const index = this.random.intFromZero(possibilities.length - 1);
            const coord = possibilities[index];
            const moveRobber = new MoveRobber({
                player: this.player,
                coord: coord
            });
            this.host.send(moveRobber);
        }
        if (this.game.expectation.matches(this.robPlayer)) {
            const coord = this.game.board.robber.coord;
            let victim = null;
            for (let node of coord.nodes) {
                if (this.game.board.nodePieces.map.has(node)) {
                    const piece = this.game.board.nodePieces.map.get(node);
                    if (piece.player !== this.player) {
                        victim = piece.player;
                        break;
                    }
                }
            }
            const robPlayer = new RobPlayer({
                player: this.player,
                opponent: victim
            });
            this.host.send(robPlayer);
        }
        if (this.game.expectation.matches(this.looseResources)) {
            const halfCount = this.player.resources.halfCount;
            const count = this.player.resources.length;
            const pickedIndices = new Set();
            while (pickedIndices.size < halfCount) {
                const index = this.random.intFromZero(count - 1);
                if (!pickedIndices.has(index)) {
                    pickedIndices.add(index);
                }
            }
            const picked = [];
            const resourceArray = this.player.resources.toArray();
            for (let i = 0; i< halfCount; i++) {
                const pick = resourceArray[i];
                picked.push(pick);
            }
            const looseResources = new LooseResources({
                player: this.player,
                resources: new ResourceList(picked)
            });
            this.host.send(looseResources);
        }
    }
    dispose() {
        this.actionAddedHandler();
        this.host = null;
        this.game = null;
        this.player = null;
        this.random = null;
    }
}
