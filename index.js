var data = require("./data_pb");

function main() {
	var el = document.getElementById("hexagon-types");
	var allHexTypes = proto.carcattone_data.HexType;
	for (var hexType in allHexTypes) {
		var itemEl = document.createElement("li");
		itemEl.textContent = hexType.toString();
		el.appendChild(itemEl);
	}
}
main();