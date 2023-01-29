import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { v4 } from "uuid";

@Component({
  selector: "app-order-placement",
  templateUrl: "./order-placement.component.html",
  styleUrls: ["./order-placement.component.scss"],
})
export class OrderPlacementComponent implements OnInit {
  checkout_confirmation_open = false;

  order_form = new FormGroup({
    order_value: new FormControl(10, [
      Validators.min(0),
      Validators.max(15),
      Validators.required,
    ]),
    tax_percentage: new FormControl(5.5, [
      Validators.min(0),
      Validators.max(99.99),
    ]),
  });

  constructor() {
    this.order_form.getError("order_value");
  }

  get order_value() {
    return this.order_form.get("order_value");
  }

  get tax_percentage() {
    return this.order_form.get("tax_percentage");
  }

  public toggle_checkout() {
    if (this.order_form.valid) {
      // console.log("Values are: ", this.order_form.getRawValue());
      this.checkout_confirmation_open = !this.checkout_confirmation_open;
    }
  }
  ngOnInit(): void {}
}
