import {ResourceList} from "./resource.js";

export class Bank {
    constructor() {
        this.resources = new ResourceList();
        this.developmentCards = [];
    }
}