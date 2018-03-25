export class Stock {
    constructor() {
        this.towns = 0;
        this.cities = 4;
        this.roads = 15;
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
}