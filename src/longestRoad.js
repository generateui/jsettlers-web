import { jsettlers as pb } from "../src/generated/data"
import { Observable } from "./generic/observable";
import { Edge } from "./edge";

/** Route starting with an edge going the direction of a Node */
class Route {
    //         edge1
    //        /  
    //    ―― ●  🡐node
    //     🡑  \
    //   edge  edge2
    // The edge is the reference edge. From there we try to look ahead
    // to edge1 and edge2.
    constructor(config) {
        this.edge = config.edge; // starting edge of this route
        this.node = config.node; // combined with edge makes this the *direction*
        this.edge1 = config.edge1; // edge when a connection available, otherwise null
        this.edge2 = config.edge2; // can be null too
        this.route1 = null; // child Route 1
        this.route2 = null; // child Route 2
        this.edges = null; // when calculated, these holds the edges
    }
    /** Recursively searches its child nodes for the longest chain of nodes */
    calculateLongestPath(edges) {
        edges = edges || new Set();
        if (edges.has(this.edge)) { // we've already passed this node: stop
            return edges;
        }
        edges.add(this.edge);
        const isEnd = this.route1 === null && this.route2 === null;
        if (isEnd) { // no consecutive child present: stop
            return edges;
        }
        const isSplit = this.route1 !== null && this.route2 !== null;
        let edges1 = null;
        let edges2 = null;
        if (isSplit) { // branch off into two routes
            // when it is a split, clone the set and the array
            edges1 = this.route1.calculateLongestPath(new Set(edges));
            edges2 = this.route2.calculateLongestPath(new Set(edges));
        } else {
            edges1 = this.route1 === null ? edges : this.route1.calculateLongestPath(new Set(edges));
            edges2 = this.route2 === null ? edges : this.route2.calculateLongestPath(new Set(edges));
        }
        return (edges1.size > edges2.size) ? edges1 : edges2;
    }
}

export class LongestRoad extends Observable {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
        this.edges = config.edges || null; // []
        
        this.name = "LongestRoad";
        this.victoryPoints = 2;

        this.makeObservable(["player", "edges"]);
    }
    static fromData(data, game) {
        let player = null;
        if (data.playerId !== undefined) {
            player = game.getPlayerById(data.playerId);
        }
        let edges = null;
        if (data.edges && data.edges.length !== 0) {
            edges = data.edges.map(ed => Edge.fromData(ed));
        }
        return new LongestRoad({
            player: player,
            edges: edges
        });
    }
    get data() {
        const data = pb.LongestRoad.create({ });
        if (this.player !== null) {
            data.playerId = this.player.id;
        }
        if (this.edges !== null) {
            data.edges = this.edges.map(e => e.data);
        }
        return data;
    }
    /** Brute-force algorithm to determine the longest road per player 
     *  1. Per player: 
     *  2. Per edge of that player, create two routes starting from either 
     *     node. This yields ($edgeCount * 2) amount of Routes.
     *  3. Per route, recursively find the longest path
     *  4. If a path is longer then the previous, set that as the winner
     *
     *  Returns a Map<Player, Edge[]> containing the longest route per player.
     */
    calculate(game) {
        const longestRouteByPlayer = new Map(); // <Player, Edge[]>
        for (let player of game.players) {
            // TODO: use only one map here, using Edge & Node combination as key
            const routes1 = new Map(); // <Edge, RouteNode>
            const routes2 = new Map(); // <Edge, RouteNode>
            const edgePieces = player.edgePieces;
            //     edge1     edge3
            //         \     /  
            // node1🡒  ● ―― ●  🡐node2
            //         /  🡑  \
            //     edge2  |   edge4
            //           edge 
            for (let edge of edgePieces.keys()) {
                //         edge1
                //        /  
                //    ―― ●  🡐node1
                //     🡑  \
                //   edge  edge2
                //     
                const node1 = edge.node1;
                const index1 = node1.edges.indexOf(edge);
                const otherEdges1 = node1.otherEdges(edge);
                const edge1 = otherEdges1[0];
                const edge2 = otherEdges1[1];
                const pieceAtNode1 = game.board.nodePieces.map.has(node1);

                //   ✔️         ❌         ✔️                                 🔴: opponent town/city
                //        /           /          /          / 🡐 edge: ️️️✔️      ️️✔️: connects
                //    ―― ⌂       ―― 🔴      ――          ――                     ❌: does not connect
                //        \           \          \          ⋱ 🡐 no edge: ❌    ⌂ : player town/city
                //                                                              ⋱ : player has no road on edge
                const isOpponentAtNode1 = pieceAtNode1 && game.board.nodePieces.map.get(node1).player !== player;
                const connects1 = !pieceAtNode1 || !isOpponentAtNode1;
                const connectingEdge1 = connects1 && edgePieces.has(edge1) ? edge1 : null;
                const connectingEdge2 = connects1 && edgePieces.has(edge2) ? edge2 : null;
                const route1 = new Route({
                    edge: edge,
                    node: node1,
                    // it's possible both edges here are null. This will terminate the 
                    // recursive search immediately. 
                    edge1: connectingEdge1,
                    edge2: connectingEdge2,
                });
                routes1.set(edge, route1);

                // I had this duplicated code refactored into a function, but it mainly complicated 
                // matters. So I rolled that back.
                const node2 = edge.node2;
                const node2Edges = node2.edges;
                const otherEdges2 = node2.otherEdges(edge);
                const edge3 = otherEdges2[0];
                const edge4 = otherEdges2[1];
                const pieceAtNode2 = game.board.nodePieces.map.has(edge.node2);
                const opponentAtNode2 = pieceAtNode2 && game.board.nodePieces.map.get(edge.node2).player !== player;
                const connects2 = !pieceAtNode2 || !opponentAtNode2;
                const connectingEdge3 = connects2 && edgePieces.has(edge3) ? edge3 : null;
                const connectingEdge4 = connects2 && edgePieces.has(edge4) ? edge4 : null;
                const route2 = new Route({
                    edge: edge,
                    node: edge.node2,
                    edge1: connectingEdge3,
                    edge2: connectingEdge4,
                });
                routes2.set(edge, route2);
            }
            // set the references of routenodes now we have all of them
            const allRoutes = [...Array.from(routes1.values()), ...Array.from(routes2.values())];
            for (let route of allRoutes) {
                // below code could be done simpler with a single map
                if (route.edge1 !== null) {
                    const rn1 = routes1.get(route.edge1);
                    if (rn1.node !== route.node) {
                        route.route1 = rn1;
                    }
                    const rn2 = routes2.get(route.edge1);
                    if (rn2.node !== route.node) {
                        route.route2 = rn2;
                    }
                }
                if (route.edge2 !== null) {
                    const rn1 = routes1.get(route.edge2);
                    if (rn1.node !== route.node) {
                        route.route1 = rn1;
                    }
                    const rn2 = routes2.get(route.edge2);
                    if (rn2.node !== route.node) {
                        route.route2 = rn2;
                    }
                }
            }
            let longestRoute = null;
            for (let route of allRoutes) {
                route.edges = Array.from(route.calculateLongestPath());
                if (longestRoute === null || route.edges.length > longestRoute.edges.length) {
                    longestRoute = route;
                }
            }
            longestRouteByPlayer.set(player, longestRoute === null ? [] : longestRoute.edges);
        }
        return longestRouteByPlayer;
    }
}