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
  loading: boolean = true;
  state: ClrDatagridStateInterface;

   refreshDataGrid(state: ClrDatagridStateInterface) {
     this.loading = true;
    if (state) {
      this.state = state;
    }else{
      this.state = undefined;
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
     this.dataService.getData(this.state).subscribe(data =>
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



