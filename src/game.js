class Game extends Observable {
    constructor() {
        super();

        this.robber = new Robber(Coord3D.center);
        this.players = [];
        this.playerOnTurn = null;
        this.board = null;
        this.towns = new ObservableMap(); // <Node, Town>
        this.cities = new ObservableMap(); // <Node, City>
        this.roads = new ObservableMap(); // <Edge, Road>
        this.developmentCards = []; // TODO: observable array
        this.bank = new Bank();
    }
}