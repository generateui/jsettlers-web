class PlayerPicker extends Observable {
    constructor(players) {
        super();
        this.player = players[0];
        this.makeObservable(["player"]);

        var el = document.getElementById("players");
        var i = 1;
        var that = this;
        for (var p of players) {
            (function(player) {
                const playerName = "player" + i.toString();
                const id = playerName;
                var radioEl = document.createElement("input");
                radioEl.type = "radio";
                radioEl.value = playerName;
                radioEl.id = id;
                radioEl.name = "playerPicker";
                radioEl.player = player;
    
                radioEl.onchange = event => {
                    var newPlayer = event.target.player;
                    that.player = player;
                }
    
                var labelEl = document.createElement("label");
                var squareSpanEl = document.createElement("span");
                squareSpanEl.textContent = "⬛ ";
                squareSpanEl.style.color = that.toColor(player.color);
                labelEl.appendChild(squareSpanEl);
                var nameSpanEl = document.createElement("span");
                nameSpanEl.textContent = playerName;
                labelEl.appendChild(nameSpanEl);
                labelEl.htmlFor = id;
    
                el.appendChild(radioEl);
                el.appendChild(labelEl);
            })(p);

            i++;
        }
    }
    toColor(integer) {
        // integer >>>= 0;
        // var b = integer & 0xFF,
        //     g = (integer & 0xFF00) >>> 8,
        //     r = (integer & 0xFF0000) >>> 16,
        //     a = ( (integer & 0xFF000000) >>> 24 ) / 255 ;
        // return "rgba(" + [r, g, b, a].join(",") + ")";
        return '#' + ('00000' + (integer | 0).toString(16)).substr(-6);
    }
}