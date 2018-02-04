function playTestGame() {
    var game = new Game();
    var player1 = new Player();
    const user1 = new User();
    user1.name = "user1";
    user1.id = 1;
    user1.color = 0xff0000;
    player1.user = user1;

    var player2 = new Player();
    const user2 = new User();
    user2.name = "user2";
    user2.id = 1;
    user2.color = 0x00ff00;
    player2.user = user2;

    var player3 = new Player();
    const user3 = new User();
    user3.name = "user3";
    user3.id = 1;
    user3.color = 0x0000ff;
    player3.user = user3;
    
    game.players.push(player1);
    game.players.push(player2);
    game.players.push(player3);

    var playersComponent = new PlayersComponent(game);
}