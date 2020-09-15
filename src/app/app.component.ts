  import { Component, OnInit, DoCheck } from '@angular/core';
  import{ Item } from './services/item';
  import { DataService } from './services/data.service';
  import { Subject } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent implements OnInit{

  items: Item[] = [];
  selected: Item[] = [];
  error:any;
  checked: boolean = false;
  field : string = "purchase";
  order : number = 1;


  constructor(private dataService: DataService){}

  changeOrder(field: string){
    if(this.order==1){
      this.order=-1;
    }else{
      this.order=1;
    }
    this.field=field;
    this.refresh();
  }


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
    this.dataService.getData(this.field, this.order).subscribe(data => this.items=data,
      error => {this.error = error.message; console.log(error);});
  }

  delItem(): void {
     this.dataService.delItem(this.selected);
     this.refresh();
  }
}



