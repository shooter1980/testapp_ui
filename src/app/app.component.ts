  import { Component, OnInit, DoCheck } from '@angular/core';
  import{ Item } from './services/item';
  import { DataService } from './services/data.service';
  import {ClrDatagridComparatorInterface} from "@clr/angular";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent implements OnInit{

  items: Item[] = [];
  selected: Item[] = [];
  error:any;
  checked: boolean = false;
  public itemCountComparator = new ItemCountComparator();
  public itemSumComparator = new ItemSumComparator();


  constructor(private dataService: DataService){}

  ngOnInit(){
    this.refresh();

  }

  ngDoCheck(){
    this.refreshCheck();
  }

  refreshCheck(){
    this.checked =false;
      if(this.selected.length>0){
        this.checked = true;
      }
  }


  refresh():void{
    this.dataService.getData().subscribe(data => this.items=data,
      error => {this.error = error.message; console.log(error);});
  }

  delItem(): void {
     this.dataService.delItem(this.selected);
     this.refresh();
  }
}


  class ItemCountComparator implements ClrDatagridComparatorInterface<Item> {
    compare(a: Item, b: Item) {
      return a.count - b.count;
    }
  }

  class ItemSumComparator implements ClrDatagridComparatorInterface<Item> {
    compare(a: Item, b: Item) {
      return a.sum - b.sum;
    }
  }
