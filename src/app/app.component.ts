  import { Component } from '@angular/core';
  import{ Item } from './services/item';
  import { DataService } from './services/data.service';
  import {ClrDatagridStateInterface} from "@clr/angular";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent {

  items: Item[] = [];
  selected: Item[] = [];
  error:any;
  checked: boolean = false;
  field : string = "purchase";
  order : number = 1;
  loading: boolean = true;
  // filters: { [prop: string]: any[] } = {};
  filters : any[] ;

  refreshDataGrid(state: ClrDatagridStateInterface) {
    if (state.filters) {
      this.filters = state.filters;
      // for (const filter of state.filters) {
      //   let { property, value } = <{ property: string; value: any[] }>filter;
      //   this.filters[property] = value;
      //   console.info(this.filters);
      // }
    }else{
      this.filters = undefined;
    }
    if(state.sort){
      this.field = state.sort.by.toString();
      if(state.sort.reverse){
        this.order = -1;
      }else{
        this.order = 1;
      }
    }
    this.refresh();
  }

  selectionChanged(state : ClrDatagridStateInterface){
    this.checked =false;
    if(this.selected.length>0){
      this.checked = true;
    }
  }

  constructor(private dataService: DataService){}


  refresh():void{
    // this.loading=true;
     this.dataService.getData(this.field, this.order, this.filters).subscribe(data =>
       {
         this.items=data;
         this.loading = false;
     },
      error => {
       this.error = error.message;
       console.log(error);
        this.loading = true;
     });
  }

  delItem(): void {
     this.dataService.delItem(this.selected);
     this.refresh();
  }
}



