var proto = require("../data_pb");

export class Resource {
    static fromType(resourceType) {
        switch (resourceType) {
            case proto.ResourceType.TIMBER: return new Timber();
            case proto.ResourceType.WHEAT: return new Wheat();
            case proto.ResourceType.ORE: return new Ore();
            case proto.ResourceType.SHEEP: return new Sheep();
            case proto.ResourceType.BRICK: return new Brick();
            case proto.ResourceType.GOLD: return new Gold();
        }
        throw new Error(`Unsupported resource type [${resourceType}]`);
    }
}
export class Timber extends Resource {
    constructor() {
        super();
    }
    get name() { return "Timber" }
    get type() { return proto.ResourceType.TIMBER; }
    get color() { return 0x006400; }
}
export class Wheat extends Resource {
    constructor() {
        super();
    }
    get name() { return "Wheat" }
    get type() { return proto.ResourceType.WHEAT; }
    get color() { return 0xFFD700; }
}
export class Brick extends Resource {
    constructor() {
        super();
    }
    get name() { return "Brick" }
    get type() { return proto.ResourceType.BRICK; }
    get color() { return 0xFF3232; }
}
export class Sheep extends Resource {
    constructor() {
        super();
    }
    get name() { return "Sheep" }
    get type() { return proto.ResourceType.SHEEP; }
    get color() { return 0x00FF00; }
}
export class Ore extends Resource {
    constructor() {
        super();
    }
    get name() { return "Ore" }
    get type() { return proto.ResourceType.ORE; }
    get color() { return 0x8A2BE2; }
}
export class Gold extends Resource {
    constructor() {
        super();
    }
    get name() { return "Gold" }
    get type() { return proto.ResourceType.GOLD; }
    get color() { return 0x000000; } // TODO
}

/** Stores resources per resourceType */
export class ResourceList {
    constructor() {
        for (var resourceType in proto.ResourceType) {
            this[resourceType] = [];
        }
    }
    /** singleton instance for empty resource list */
    static get empty() {
        if (ResourceList._empty === undefined) {
            ResourceList._empty = new ResourceList();
        }
        return ResourceList._empty;
    }
    /** Constructor to cerate new instance from given resourceList instance */
    static from(resourceList) {
        var result = new ResourceList();
        for (var resourceType in proto.ResourceType) {
            for (var resource of this[resourceType]) {
                // This assumes Reource does not have any state
                const copy = Resource.fromType(resource.type);
                result[resourceType].push(copy);
            }
        }
        return result;
    }
    static fromArray(array) {
        var result = new ResourceList();
        for (var resource of array) {
            result[resource.type].push(resource);
        }
        return result;
    }
    add(resourceList) {
        for (var resourceType in resourceList.ResourceType) {
            for (var resource of resourceList[resourceType]) {
                // create new instances so the given resourceList can be GC'ed
                const copy = Resource.fromType(resource.type);
                this[resourceType].push(copy);
            }
        }
    }
    /** assumes this hasAtLeast(resourceList) */
    remove(resourceList) {
        if (!this.hasAtLeast(resourceList)) {
            throw new Error("attempting to remove more resources then available");
        }
        for (var resourceType in resourceList.ResourceType) {
            this[resourceType].splice(0, resourceList[resourceType].length);
        }
    }
    /** true if no resource instances are contained in this list */
    get isEmpty() {
        for (var resourceType in proto.ResourceType) {
            if (this[resourceType].length !== 0) {
                return false;
            }
        }
        return true;
    }
    /** true if this list has at least all resource instances of given resourceList  */
    hasAtLeast(minimum) {
        for (var resourceType in minimum) {
            if (minimum[resourceType] > this[resourceType]) {
                return false;
            }
        }
    }
    /** true if this list has resources of given resourceType */
    hasOfType(resourceType) {
        return this[resourceType].length > 0;
    }
    /** returns amount of resourceTypes this list contains */
    get amountTypes() {
        var amount = 0;
        for (var resourceType in proto.ResourceType) {
            if (this[resourceType].length > 0) {
                amount++;
            }
        }
        return amount;
    }
    moveFrom(source, toMove) {
        for (var resourceType in toMove) {
            for (var resource of toMove[resourceType]) {
                this[resourceType].push(resource);
                source[resourceType].remove(resource);
            }
        }
    }
}