import { Item } from './item'
import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { HttpClient, HttpParams , HttpHeaders} from '@angular/common/http';
import {ClrDatagridStateInterface} from "@clr/angular";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class DataService{

  constructor(private logService: LogService, private http: HttpClient){}

  public getData(state: ClrDatagridStateInterface): Observable<Item[]> {
        this.logService.write("get items");
        return this.http.post<Item[]>('http://localhost:3000/api/items/', state).pipe(map(res => {
          return res.map(item => {
            return new Item(
              item.purchase,
              item.price,
              item.count,
              item._id,
              );
          });
        }));
  }

  public addItem(purchase: string, price: number, count: number) {
    if(purchase !=null && price!=null && count!=null) {
      this.logService.write("add item");
      let item = new Item(purchase, price, count);

       this.http.post<any>('http://localhost:3000/api/add_item', item, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
        .subscribe(
          (err) => {
            if(err) console.info(err);
            this.logService.write("Success");
          });
    }
  }

  public delItem(items : Item[]) {
    this.logService.write("del item");
    items.forEach(element => {
        console.info(element._id);
        this.http.delete('http://localhost:3000/api/del_item' +'/'+element._id)
          .subscribe(
            (err) => {
              if(err) console.info(err);
              this.logService.write("Success");
            });
    });
  }

  public writeFile(){
    return this.http.get('http://localhost:3000/api/write')
      .toPromise().catch(reason => {});
  }

}
