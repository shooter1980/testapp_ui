import { DataService } from './services/data.service';
import { Component , Output, EventEmitter } from '@angular/core';
import{ Item } from './services/item';

@Component({
  selector: 'child-comp',
  templateUrl: './child.component.html',
  styleUrls: []
})

  export class ChildComponent {
    purchase: string;
    price: number = null;
    count: number = null;

    constructor(private dataService:  DataService){}

    addItem(purchase: string, price: number, count: number): void {
        this.dataService.addItem(purchase, price, count);
        this.refresh();
    }

    startDownload(){
      this.dataService.writeFile();

    }
      refresh() {
          window.location.reload();
      }
  }
