import { DataService } from './services/data.service';
import { Component, Input} from '@angular/core';
import{ Item } from './services/item';

@Component({
  selector: 'child-comp',
  templateUrl: './child.component.html'
})

  export class ChildComponent {
    purchase: string;
    price: number ;
    count: number ;

    @Input() items: Item[];

    constructor(private dataService:  DataService){}

    addItem(purchase: string, price: number, count: number): void {
        this.dataService.addItem(purchase, price, count);
        this.items.push(new Item(purchase, price, count));
    }

    startDownload(){
      this.dataService.writeFile();
    }
  }
