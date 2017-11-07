class ChitTypePicker {
    constructor(setChit) {
        this._setChit = setChit || new SetChit();
        
        var el = document.getElementById("chit-types");
        var allChitTypes = proto.carcattonne_data.ChitType;
        for (var chitName in allChitTypes) {
            const chitType = allChitTypes[chitName];
            var id = "chittype-" + chitType.toString();
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = chitType.toString();
            radioEl.id = id;
            radioEl.name = "chitTypePicker";
            radioEl.chitType = proto.carcattonne_data.ChitType[chitName];
            radioEl.onchange = event => {
                var newType = event.target.chitType;
                this._setChit.chitType = newType;
            }

            var labelEl = document.createElement("label");
            var imageEl = document.createElement("img");
            var imageFileName;
            var humanChitName = null;
            if (chitType === proto.carcattonne_data.ChitType.NONE) {
                humanChitName = "ChitNone";
            } else if (chitType === proto.carcattonne_data.ChitType.FROMBAG) {
                humanChitName = "ChitFromBag";
            } else {
                humanChitName = this._getPascalCasedName(chitName);
            }
            imageEl.src = "doc/images/" + humanChitName + ".png";
            labelEl.appendChild(imageEl);
            var spanEl = document.createElement("span");
            spanEl.textContent = humanChitName;
            labelEl.appendChild(spanEl);
            labelEl.htmlFor = id;

            el.appendChild(radioEl);
            el.appendChild(labelEl);
        }
    }
    _getPascalCasedName(str) {
        return str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }
}