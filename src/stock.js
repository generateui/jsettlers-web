import { jsettlers as pb } from "../src/generated/data";

export class Stock {
    constructor(config) {

        config = config || {}
        this.towns = config.towns || 5;
        this.cities = config.cities || 4;
        this.roads = config.roads || 15;
    }
    static parse(stockExpression) {
        const stock = new Stock();
        for (let stockItem of stockExpression.stockItem()) {
            let amount = parseInt(stockItem.NUMBER());
            if (stockItem.piece().city() !== null) {
                stock.cities = amount;
            }
            if (stockItem.piece().road() !== null) {
                stock.roads = amount;
            }
            if (stockItem.piece().town() !== null) {
                stock.towns = amount;
            }
        }
        return stock;
    }
    get data() {
        return pb.Stock.create({
            roads: this.roads,
            towns: this.towns,
            cities: this.cities,
        });
    }
    static fromData(data) {
        return new Stock({
            roads: data.roads,
            towns: data.towns,
            cities: data.cities
        });
    }
}