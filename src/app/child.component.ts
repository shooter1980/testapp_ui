import { DataService } from './services/data.service';
import { Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import{ Item } from './services/item';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'child-comp',
  templateUrl: './child.component.html'
})

  export class ChildComponent {
    purchase: string;
    price: number ;
    count: number ;
      addForm = new FormGroup({
        inputControl: new FormControl('', Validators.required),
    });

  @ViewChild(ClrForm, {static: true}) clrForm;

  resetForm() {
    this.addForm.reset();
  }

    constructor(private dataService:  DataService){}

    addItem(purchase: string, price: number, count: number): void {
      if (this.addForm.invalid) {
        this.clrForm.markAsTouched();
      } else {
        this.dataService.addItem(purchase, price, count);
      }

    }

    startDownload(){
      this.dataService.writeFile();
    }
  }
