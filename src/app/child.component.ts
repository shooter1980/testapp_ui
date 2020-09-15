import { DataService } from './services/data.service';
import { Component} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import{ Item } from './services/item';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'child-comp',
  templateUrl: './child.component.html'
})

  export class ChildComponent {
      addForm = new FormGroup({
        purchase: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        count: new FormControl('', Validators.required),
    });


  resetForm() {
    this.addForm.reset();
  }

    constructor(private dataService:  DataService){}

    addItem(): void {// purchase: string, price: number, count: number
      if (!this.addForm.invalid) {
        this.dataService.addItem(this.addForm.get("purchase").value, this.addForm.get("price").value, this.addForm.get("count").value);
      }
    }

    startDownload(){
      this.dataService.writeFile();
    }
  }
