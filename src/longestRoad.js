import { Observable } from "./generic/observable";

class Route {
    constructor(config) {
        this.edge = config.edge;
        this.node = config.node;
        this.edge1 = config.edge1; // can be null
        this.edge2 = config.edge2; // can be null too
        this.route1 = null;
        this.route2 = null;
        this.nodes = null;
    }
    get edges() { 
        return this.nodes;
    }
    /** Recursively searches its child nodes for the longest chain of nodes */
    calculateLongestPath(set) {
        set = set || new Set();
        if (set.has(this.edge)) { // we've already passed this node
            return set;
        }
        set.add(this.edge);
        const isEnd = this.route1 === null && this.route2 === null;
        if (isEnd) {
            return set;
        }
        const isSplit = this.route1 !== null && this.route2 !== null;
        let nodes1 = null;
        let nodes2 = null;
        if (isSplit) {
            // when it is a split, clone the set and the array
            nodes1 = this.route1.calculateLongestPath(new Set(set));
            nodes2 = this.route2.calculateLongestPath(new Set(set));
        } else {
            nodes1 = this.route1 === null ? set : this.route1.calculateLongestPath(new Set(set));
            nodes2 = this.route2 === null ? set : this.route2.calculateLongestPath(new Set(set));
        }
        return (nodes1.size > nodes2.size) ? nodes1 : nodes2;
    }
}

export class LongestRoad extends Observable {
    constructor() {
        super();

        this.victoryPoints = 2;
        this.player = null;
        this.edges = null; // []
        this.name = "LongestRoad";

        this.makeObservable(["player", "edges"]);
    }
    calculate(game) {
        const longestRouteByPlayer = new Map(); // <Player, Edge[]>
        for (let player of game.players) {
            // differentiate starting nodes (which can have opponent piece on node) with
            // non-startingnodes (which cant have opponent piece on node)
            // const startNodes = [];
            // TODO: use only one map here
            const routeNodes1 = new Map(); // <Edge, RouteNode>
            const routeNodes2 = new Map(); // <Edge, RouteNode>
            const edgePieces = player.edgePieces;
            for (let edge of edgePieces.keys()) {
                const node1 = edge.node1;
                const node2 = edge.node2;

                const node1Edges = node1.edges;
                const index1 = node1Edges.indexOf(edge);
                const edge1 = index1 === 0 ? node1Edges[1] : node1Edges[0];
                const edge2 = index1 === 0 ? node1Edges[2] : index1 == 1 ? node1Edges[2] : node1Edges[1];
                const pieceAtNode1 = game.board.nodePieces.has(node1);
                const opponentAtNode1 = pieceAtNode1 && game.board.nodePieces.get(node1).player !== player;
                const connects1 = !pieceAtNode1 || !opponentAtNode1;
                const connectingEdge1 = connects1 && edgePieces.has(edge1) ? edge1 : null;
                const connectingEdge2 = connects1 && edgePieces.has(edge2) ? edge2 : null;
                const routeNode1 = new Route({
                    edge: edge,
                    node: node1,
                    edge1: connectingEdge1,
                    edge2: connectingEdge2,
                });
                routeNodes1.set(edge, routeNode1);

                const node2Edges = node2.edges;
                const index2 = node2Edges.indexOf(edge);
                const edge3 = index2 === 0 ? node2Edges[1] : node2Edges[0];
                const edge4 = index2 === 0 ? node2Edges[2] : index2 == 1 ? node2Edges[2] : node2Edges[1];
                const pieceAtNode2 = game.board.nodePieces.has(edge.node2);
                const opponentAtNode2 = pieceAtNode2 && game.board.nodePieces.get(edge.node2).player !== player;
                const connects2 = !pieceAtNode2 || !opponentAtNode2;
                const connectingEdge3 = connects2 && edgePieces.has(edge3) ? edge3 : null;
                const connectingEdge4 = connects2 && edgePieces.has(edge4) ? edge4 : null;
                const routeNode2 = new Route({
                    edge: edge,
                    node: edge.node2,
                    edge1: connectingEdge3,
                    edge2: connectingEdge4,
                });
                routeNodes2.set(edge, routeNode2);
            }
            // set the references of routenodes now we have all of them
            const allRouteNodes = [...Array.from(routeNodes1.values()), ...Array.from(routeNodes2.values())];
            for (let rn of allRouteNodes) {
                if (rn.edge1 !== null) {
                    const rn1 = routeNodes1.get(rn.edge1);
                    if (rn1.node !== rn.node) {
                        rn.route1 = rn1;
                    }
                    const rn2 = routeNodes2.get(rn.edge1);
                    if (rn2.node !== rn.node) {
                        rn.route2 = rn2;
                    }
                }
                if (rn.edge2 !== null) {
                    const rn1 = routeNodes1.get(rn.edge2);
                    if (rn1.node !== rn.node) {
                        rn.route1 = rn1;
                    }
                    const rn2 = routeNodes2.get(rn.edge2);
                    if (rn2.node !== rn.node) {
                        rn.route2 = rn2;
                    }
                }
            }
            let longest = null;
            for (let rn of allRouteNodes) {
                rn.nodes = Array.from(rn.calculateLongestPath());
                if (longest === null || rn.nodes.length > longest.nodes.length) {
                    longest = rn;
                }
            }
            longestRouteByPlayer.set(player, longest === null ? [] : longest.edges);
        }
        return longestRouteByPlayer;
    }
}