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
}
