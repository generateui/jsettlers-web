class PortTypePicker {
    constructor(setPort) {
        this._setPort = setPort || new SetPort();
        
        var el = document.getElementById("port-types");
        var allPortTypes = proto.carcattonne_data.PortType;
        for (var portName in allPortTypes) {
            const portType = allPortTypes[portName];
            var port = Port.fromType(portType, 0, null);
            if (!port.canPlaceOnBoard) {
                continue;
            }
            var id = "porttype-" + portType.toString();
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = portType.toString();
            radioEl.id = id;
            radioEl.name = "portTypePicker";
            radioEl.portType = proto.carcattonne_data.PortType[portName];
            radioEl.onchange = event => {
                var newType = event.target.portType;
                this._setPort.portType = newType;
            }

            var labelEl = document.createElement("label");
            var imageEl = document.createElement("img");
            var imageFileName;
            var humanPortName = Util.getPascalCasedName(portName);
            imageEl.src = `doc/images/${humanPortName}port.png`;
            labelEl.appendChild(imageEl);
            var spanEl = document.createElement("span");
            spanEl.textContent = humanPortName;
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