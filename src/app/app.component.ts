  import { Component, OnInit } from '@angular/core';
  import{ Item } from './services/item';
  import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{

  items: Item[] = [];
  error:any;
  checked: boolean = false;

  constructor(private dataService: DataService){}

  ngOnInit(){
    this.checked =false;
    this.refresh();
  }

  refreshCheck(){
    this.checked =false;
    for(let item of this.items){
      if(item.flag===true){
        this.checked = true;
      }
    }
  }

  refresh():void{
    this.dataService.getData().subscribe(data => this.items=data,
      error => {this.error = error.message; console.log(error);});
  }

  delItem(): void {
     this.dataService.delItem(this.items);
     this.refresh();
  }
}
