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
  goBackToOrderPage = new EventEmitter();

  @Input()
  tax_percentage = 0;
  @Input()
  order_value = 0;

  order_id: string;

  readonly initialRequestState = {
    error_message: "",
    success: false,
    loading: false,
    ticket: "",
  };

  request_state = {
    ...this.initialRequestState,
  };

  constructor(
    private readonly moneris_checkout_service: MonerisCheckoutService
  ) {
    this.order_id = v4();
  }

  confirmCheckout() {
    this.request_state = {
      ...this.initialRequestState,
      loading: true,
    };
    this.moneris_checkout_service
      .generateToken({
        tax_percentage: this.tax_percentage,
        order_uuid: this.order_id,
        total: this.order_value,
      })
      .subscribe(
        (res) => {
          if (res?.success) {
            this.request_state = {
              ...this.initialRequestState,
              success: true,
              ticket: res.ticket,
            };
          } else {
            this.request_state = {
              ...this.initialRequestState,
              error_message:
                "Unable to communicate with moneris.Please check console",
            };
          }
        },
        (err) => {
          console.error(err);
          this.request_state = {
            ...this.initialRequestState,
            error_message:
              "Unable to communicate with moneris.Please check browser console",
          };
        }
      );
  }

  reset_form_state() {
    this.request_state = {
      ...this.initialRequestState,
    };
    this.order_id = v4();
  }

  ngOnInit(): void {
    this.reset_form_state();
  }

  goBack() {
    this.goBackToOrderPage.emit();
  }
}
