/** A UI component showing a list of hex types so user can select a hex
 *  type. 
 * setHex.hexType is used to track selected HexType.
 * */
class HexTypePicker {
    constructor(setHex) {
        this._setHex = setHex || new SetHex();
        
        this.element = document.getElementById("hexagon-types");
        var allHexTypes = proto.carcattonne_data.HexType;
        for (var hexType in allHexTypes) {
            var id = "hextype-" + hexType.toString();
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = hexType.toString();
            radioEl.id = id;
            radioEl.name = "hexTypePicker";
            radioEl.hexType = proto.carcattonne_data.HexType[hexType];
            radioEl.onchange = event => {
                var optionItem = event.target;
                var newType = optionItem.hexType;
                this._setHex.hexType = newType;
            }

            var labelEl = document.createElement("label");
            labelEl.textContent = hexType.toString();
            labelEl.htmlFor = id;

            this.element.appendChild(radioEl);
            this.element.appendChild(labelEl);
        }
    }
}