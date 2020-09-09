import { Item } from './item'
import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class DataService{

  constructor(private logService: LogService, private http: HttpClient){}

  public getData(): Observable<Item[]> {
        this.logService.write("get items");
        return this.http.get<Item[]>('http://localhost:3000/api/items').pipe(map(res => {
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
      const params: HttpParams = new HttpParams()
      .set('purchase', item.purchase)
      .set('price', item.price.toString())
      .set('count', item.count.toString())
      .set('sum', item.sum.toString());
      return this.http.get('http://localhost:3000/api/add_item', {params:params})
        .toPromise().catch(reason => {});
    }
  }

  public delItem(items : Item[]) {
    console.info("del item");
    items.forEach(element => {
      if(element.flag===true){
        console.info(element._id);
        const params: HttpParams = new HttpParams()
          .set('_id', element._id);
        this.http.get('http://localhost:3000/api/del_item', {params:params})
          .toPromise().catch(reason => {});
      }
    });
  }

  public writeFile(){
    return this.http.get('http://localhost:3000/api/write')
      .toPromise().catch(reason => {});
  }
}
