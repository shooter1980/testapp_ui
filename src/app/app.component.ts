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


  constructor(private dataService: DataService){}

  ngOnInit(){
    this.refresh();
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
