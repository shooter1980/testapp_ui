export class Item {
    _id? : string;
	  flag : boolean;
    purchase: string;
    price: number;
    count: number;
    sum?: number;

    constructor( purchase: string, price: number, count: number, _id? : string) {
        this._id = _id;
        this.purchase = purchase;
        this.price = price;
        this.count = count;
        this.sum = price * count;
    }
}
