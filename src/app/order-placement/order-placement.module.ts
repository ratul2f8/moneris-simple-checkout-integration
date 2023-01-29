import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderPlacementComponent } from "./order-placement.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutConfirmationComponent } from "./checkout-confirmation/checkout-confirmation.component";
import { MonerisCheckoutModule } from "../moneris-checkout/moneris-checkout.module";

@NgModule({
  declarations: [OrderPlacementComponent, CheckoutConfirmationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonerisCheckoutModule,
  ],
})
export class OrderPlacementModule {}
