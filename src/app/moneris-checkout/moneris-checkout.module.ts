import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonerisCheckoutComponent } from './moneris-checkout.component';



@NgModule({
  declarations: [MonerisCheckoutComponent],
  imports: [
    CommonModule
  ],
  exports: [MonerisCheckoutComponent]
})
export class MonerisCheckoutModule { }
