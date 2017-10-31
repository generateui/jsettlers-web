/** A UI component enabling user to select a hex type */
class HexTypePicker {
    constructor(setHex) {
        this._setHex = setHex || new SetHex();
        
        var el = document.getElementById("hexagon-types");
        var allHexTypes = proto.carcattone_data.HexType;
        for (var hexType in allHexTypes) {
            var id = "hextype-" + hexType.toString();
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = hexType.toString();
            radioEl.id = id;
            radioEl.name = "hexTypePicker";
            radioEl.hexType = proto.carcattone_data.HexType[hexType];
            radioEl.onchange = event => {
                var optionItem = event.target;
                var newType = optionItem.hexType;
                this._setHex.hexType = newType;
            }

            var labelEl = document.createElement("label");
            labelEl.textContent = hexType.toString();
            labelEl.htmlFor = id;

            el.appendChild(radioEl);
            el.appendChild(labelEl);
        }
    }
}