class Util {
    static getPascalCasedName(text) {
        return text.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }
    static getEnumName($enum, value) {
        for (var name in $enum) {
            if ($enum[name] === value) {
                return name;
            }
        }
        throw `unsupported enum value [${value}]`;
    }
    static difference(array1, array2) {
        var set1 = new Set(array1);
        var set2 = new Set(array2);
        var result = [];
        for (var item of set1) {
          if (!set2.has(item)) {
              result.push(item);
          }
        }
        for (var item of set2) {
          if (!set1.has(item)) {
              result.push(item);
          }
        }
        return result;
     }
     static except(array, exceptionArray) {
        var set = new Set(array);
        var exceptionSet = new Set(exceptionArray);
        var result = [];
        for (var item of set) {
          if (!exceptionSet.has(item)) {
              result.push(item);
          }
        }
        return result;
     }
}
