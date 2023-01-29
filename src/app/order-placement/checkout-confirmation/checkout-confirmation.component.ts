import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { catchError } from "rxjs";
import { MonerisCheckoutService } from "src/app/moneris-checkout/moneris-checkout.service";
import { v4 } from "uuid";

@Component({
  selector: "app-checkout-confirmation",
  templateUrl: "./checkout-confirmation.component.html",
  styleUrls: ["./checkout-confirmation.component.scss"],
})
export class CheckoutConfirmationComponent implements OnInit {
  @Output()
  onCancelCheckout = new EventEmitter();

  @Input()
  tax_percentage = 0;
  @Input()
  order_value = 0;

  order_id: string;
  ticket: string;

  constructor(
    private readonly moneris_checkout_service: MonerisCheckoutService
  ) {
    this.order_id = v4();
    this.ticket = "";
  }

  confirmCheckout() {
    this.moneris_checkout_service
      .generateToken({
        tax_percentage: this.tax_percentage,
        order_uuid: this.order_id,
        total: this.order_value,
      })
      .subscribe(
        (res) => {
          if (res?.response?.ticket?.length) {
            this.ticket = res?.response?.ticket;
          }
          console.error(res);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  ngOnInit(): void {}

  cancelCheckout() {
    this.onCancelCheckout.emit();
  }
}
