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
  
function main() {
 
}
main();
 