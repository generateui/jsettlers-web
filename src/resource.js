var proto = require("../data_pb.js");
import {Util} from "./util.js";

export class Resource {
    constructor() {
        this.id = Resource.nextId();
    }
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
    static nextId() {
        if (Resource.currentId === undefined) {
            Resource.currentId = 0;
        }
        Resource.currentId++;
        return Resource.currentId;
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
    constructor(item) {
        this._map = new Map(); // <ResourceType (string), Resource[]>
        if (item === undefined) {
            return;
        }
        this.add(item);
    }
    static withAllTypes() {
        return ResourceList.onlyWithTypes([
            proto.ResourceType.TIMBER,
            proto.ResourceType.WHEAT,
            proto.ResourceType.ORE,
            proto.ResourceType.SHEEP,
            proto.ResourceType.BRICK,
        ]);
    }
    static parse(resourceListExpression) {
        var rl = new ResourceList();
        for (let resource of resourceListExpression.resource()) {
            if (resource.timber() !== null) { rl.add(new Timber()); }
            if (resource.wheat() !== null) { rl.add(new Wheat()); }
            if (resource.sheep() !== null) { rl.add(new Sheep()); }
            if (resource.brick() !== null) { rl.add(new Brick()); }
            if (resource.ore() !== null) { rl.add(new Ore()); }
        }
        return rl;
    }
    /** singleton instance for empty resource list */
    static get empty() {
        if (ResourceList._empty === undefined) {
            ResourceList._empty = new ResourceList();
        }
        return ResourceList._empty;
    }
    static onlyWithTypes(types) {
        const result = new ResourceList();
        for (var resourceType of types) {
            const resourceTypeString = Util.getEnumName(proto.ResourceType, resourceType);
            // TODO: mechanism to exclude other types from being added and error when tried
            result._map.set(resourceTypeString, []);            
        }
        return result;
    }
    _addSafe(resource) {
        const resourceTypeString = Util.getEnumName(proto.ResourceType, resource.type);
        if (!this._map.has(resourceTypeString)) {
            this._map.set(resourceTypeString, [resource]);
        } else {
            this._map.get(resourceTypeString).push(resource);
        }
    }
    _ensureTypeExists(resourceType) {
        var resourceTypeString = null;
        if (typeof(resourceType) === "number") {
            resourceTypeString = Util.getEnumName(proto.ResourceType, resourceType);
        } else {
            resourceTypeString = resourceType;
        }
        if (!this._map.has(resourceTypeString)) {
            this._map.set(resourceTypeString, []);
        }
    }
    /** Resource, ResourceType (string), ResourceType (int), array, ResourceList  */
    add(item) {
        if (item instanceof Resource) {
            this._addSafe(item);
            return;
        } else if (Array.isArray(item)) {
            for (var resource of item) {
                this.add(resource);
            }
            return;
        } else if (item instanceof ResourceList) {
            for (var resourceType of item._map.keys()) {
                this._ensureTypeExists(resourceType);
                for (var resource of item._map.get(resourceType)) {
                    this._addSafe(resource);
                }
            }
            return;
        } else if (typeof(item) === "string") {
            const resourceType = proto.ResourceType[item];
            const resource = Resource.fromType(resourceType);
            this._addSafe(resource);
            return;
        } else if (typeof(item) === "number") {
            const resource = Resource.fromType(item);
            this._addSafe(resource);
        }
    }
    addAmount(item, amount) {
        for (var i = 0; i< amount; i++) {
            this.add(item);
        }
    }
    _removeSafe(resource) {
        const resourceTypeString = Util.getEnumName(proto.ResourceType, resource.type);
        if (this._map.has(resourceTypeString)) {
            this._map.get(resourceTypeString).pop(); // ignore returned instance
        } 
    }
    /** assumes this hasAtLeast(resourceList) 
     *  Resource, ResourceType (string), ResourceType (int), array, ResourceList  */
    remove(item) {
        if (item instanceof Resource) {
            this._removeSafe(item);
            return;
        } else if (Array.isArray(item)) {
            for (let resource of item) {
                this.remove(resource);
            }
            return;
        } else if (item instanceof ResourceList) {
            for (let resourceType of item._map.keys()) {
                for (let resource of item._map.get(resourceType)) {
                    this._removeSafe(resource);
                }
            }
        } else if (typeof(item) === "string") {
            this._map.get(item).pop(); // ignore returned instance
        } else if (typeof(item) === "number") {
            const resourceTypeString = Util.getEnumName(proto.ResourceType, item);
            this._map.get(resourceTypeString).pop(); // ignore returned instance
        }
    }
    /** true if no resource instances are contained in this list */
    get isEmpty() {
        for (let resourceType of this._map.keys()) {
            if (this._map.get(resourceType).length !== 0) {
                return false;
            }
        }
        return true;
    }
    get types() {
        return Array.from(this._map.keys());
    }
    of(resourceType) {
        if (typeof(resourceType) === "number") {
            const resourceTypeString = Util.getEnumName(proto.ResourceType, resourceType);
            return this._map.has(resourceTypeString) ? this._map.get(resourceTypeString) : [];    
        } else if (typeof(resourceType) === "string") {
            return this._map.has(resourceType) ? this._map.get(resourceType) : [];
        }
        throw new Error(".of in ResourceList expects a ResourceType (String) or ResourceType (int)");
    }
    /** true if this list has at least all resource instances of given resourceList  */
    hasAtLeast(resourceList) {
        for (let resourceType of resourceList.types) {
            if (resourceList.of(resourceType) > this.of(resourceType)) {
                return false;
            }
        }
        return true;
    }
    /** true if this list has resources of given resourceType */
    hasOf(resourceType) {
        let resourceTypeString = resourceType;
        if (typeof(resourceType) === "number") {
            resourceTypeString = Util.getEnumName(proto.ResourceType, resourceType);
        }
        if (typeof(resourceType) !== "string" && typeof(resourceType) !== "number") {
            throw new Error(".hasOf in ResourceList expects a ResourceType (String) or (Number)");
        }
        return this.of(resourceTypeString).length > 0;
    }
    /** returns amount of resourceTypes this list contains */
    get amountTypes() {
        let amount = 0;
        for (var resourceType of this.types) {
            if (this.of(resourceType).length > 0) {
                amount++;
            }
        }
        return amount;
    }
    get length() {
        var amount = 0;
        for (var resourceType of this.types) {
            amount += this.of(resourceType).length;
        }
        return amount;
    }
    get halfCount() {
        return Math.floor(this.length / 2);
    }
    toArray() {
        var result = [];
        for (var resourceType of this.types) {
            result = result.concat(this.of(resourceType));
        }
        return result;
    }
    toResourceTypeArray() {
        var result = [];
        for (var resourceType of this.types) {
            for(var resource of this.of(resourceType)) {
                result.push(resource.type);
            }
        }
        return result;
    }
    moveFrom(source, toMove) {
        for (var resourceType of toMove.types) {
            for (var resource of toMove.of(resourceType)) {
                this._addSafe(resource);
                source.remove(resource);
            }
        }
    }
    amountGoldNeeded(resourceList) {
        let amountGold = 0;
        for (var resourceType of resourceList.types) {
            let difference = resourceList.of(resourceType).length - this.of(resourceType).length;
            difference = difference < 0 ? 0 : difference;
            amountGold += difference;
        }
        return amountGold;
    }
}