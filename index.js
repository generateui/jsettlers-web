var data = require("./data_pb");

String.prototype.hashCode = function() {
    var hash = 0, i, charCode;
    if (this.length === 0) {
        return 0;
    }
    for (i = 0; i < this.length; i++) {
      charCode = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + charCode;
      hash |= 0;
    }
    return hash;
  };
  
  var boardDesign = null;
  var boardRenderer = null;
  var hexTypePicker = null;
  var chitTypePicker = null;
  var portTypePicker = null;
  var boardBehaviorPicker = null;
  var playerPicker = null;

<<<<<<< HEAD
=======
}
main();

  var boardDesign = null;
  var boardRenderer = null;
  var hexTypePicker = null;
  var chitTypePicker = null;
  var portTypePicker = null;
  var boardBehaviorPicker = null;
  var playerPicker = null;

>>>>>>> master
  window.addEventListener('load', function(evt) {
      // A design representation of a board morphable into a play board
      boardDesign = new Standard4pDesign();

      // behavior to change clicked hex into selected HexType
      const setHex = new SetHex();
      const setChit = new SetChit();
      const setPort = new SetPort();
      const buildTown = new BuildTown();
      const buildCity = new BuildCity();
      const buildRoad = new BuildRoad();
      const behaviors = [
          new NoBehavior(),
          new EmphasizeHoveredObject(),
          setHex,
          setChit,
          new CompositeBehavior(new EmphasizeHoveredObject(), new ShowAllEdges()),
          new ShowAllNodes(),
          new ShowNodesOfClickedHex(),
          new ShowAllEdges(),
          new ShowEdgesOfClickedHex(),
          new ShowEdgesOfClickedNode(),
          setPort,
          new MoveRobber(),
          buildTown,
          buildCity,
          buildRoad,
      ];

      // render the board in a 3D viewport 
      var brEl = document.getElementById("board-renderer");
      boardRenderer = new BoardRenderer(brEl, boardDesign, setHex);

      var bbpEl = document.getElementById("behaviors");
      boardBehaviorPicker = new BoardBehaviorPicker(bbpEl, boardRenderer, behaviors);

      // widget to let the user pick a HexType
      hexTypePicker = new HexTypePicker(setHex);
      chitTypePicker = new ChitTypePicker(setChit);
      portTypePicker = new PortTypePicker(setPort);
      var player1 = new Player();
      player1.color = 0xff0000;
      var player2 = new Player();
      player2.color = 0x00ff00;
      var player3 = new Player();
      player3.color = 0x0000ff;
      var player4 = new Player();
      player4.color = 0xffffff;
      var player5 = new Player();
      player5.color = 0xffa500;
      var player6 = new Player();
      player6.color = 0x654321;
      var players = [ player1, player2, player3, player4, player5, player6 ];
      playerPicker = new PlayerPicker(players);

      playerPicker.playerChanged((oldValue, newValue) => {
          buildTown.player = newValue;
          buildCity.player = newValue;
          buildRoad.player = newValue;
      });

      var sublevelByBehavior = new Map();
      sublevelByBehavior.set(setChit, chitTypePicker);
      sublevelByBehavior.set(setHex, hexTypePicker);
      sublevelByBehavior.set(setPort, portTypePicker);
      sublevelByBehavior.set(buildTown, playerPicker);
      sublevelByBehavior.set(buildCity, playerPicker);
      sublevelByBehavior.set(buildRoad, playerPicker);

      boardBehaviorPicker.behaviorChanged((oldValue, newValue) => {
        if (sublevelByBehavior.has(oldValue)) {
            var control = sublevelByBehavior.get(oldValue);
            control.element.parentElement.style.display = "none";
        }
        if (sublevelByBehavior.has(newValue)) {
            var control = sublevelByBehavior.get(newValue);
            control.element.parentElement.style.display = "block";
        }
      });
  });
<<<<<<< HEAD
 
=======
>>>>>>> master
