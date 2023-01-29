import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { environment } from "src/environments/environment";

// {
//   "store_id": "store3",
//   "api_token": "yesguy",
//   "checkout_id": "chktLYQSUtore3",
//   "txn_total": "5.00",
//   "environment": "qa",
//   "action": "preload",
//   "dynamic_descriptor": "dyndesc",
//   "language": "en",
//   "order_no": "testing-order-an1",
//   "cart": {
//       "items": [],
//       "subtotal": "4.00",
//       "tax": {
//           "amount": "1.00",
//           "description": "Taxes",
//           "rate": "20.00"
//       }
//   }
// }
@Component({
  selector: "app-moneris-checkout",
  templateUrl: "./moneris-checkout.component.html",
  styleUrls: ["./moneris-checkout.component.scss"],
})
export class MonerisCheckoutComponent implements OnInit {
  @Output()
  goBackCheckoutEvent = new EventEmitter();

  @Output()
  paymentCompleteEvent = new EventEmitter();

  @Input()
  ticket = "";

  public checkOutData = {
    success: false,
    err: "",
  };
  constructor() {}

  public resetCheckoutState() {
    this.checkOutData = {
      success: false,
      err: "",
    };
  }
  private setError(err?: Error) {
    this.checkOutData = {
      success: false,
      err: err?.message?.length
        ? err.message
        : "Unable to communicate with moneris. Please check console for more info. Reload the page and try again.",
    };
  }

  ngOnInit(): void {
    this.resetCheckoutState();
    //@ts-ignore
    var myCheckout = new monerisCheckout();
    myCheckout.setMode(environment.moneris_mode);
    myCheckout.setCheckoutDiv("monerisCheckout");
    myCheckout.setCallback("page_loaded", () => this.myPageLoad());
    myCheckout.setCallback("cancel_transaction", () =>
      this.myCancelTransaction()
    );
    myCheckout.setCallback("error_event", (err: any) => this.myErrorEvent(err));
    // myCheckout.setCallback("payment_receipt", myPaymentReceipt);
    myCheckout.setCallback("payment_complete", () => this.myPaymentComplete());
    //ticket number goes here
    myCheckout.startCheckout(this.ticket);
  }

  private myPageLoad() {
    console.log("Loaded Moneris");
  }

  private myCancelTransaction() {
    this.goBackCheckoutEvent.emit();
  }

  private myErrorEvent(err: any) {
    console.error("Error Loading Moneris ");
    this.setError(err);
  }

  private myPaymentComplete() {
    this.checkOutData = {
      err: "",
      success: true,
    };
    setTimeout(() => {
      this.paymentCompleteEvent.emit();
    }, 2000);
  }
}
