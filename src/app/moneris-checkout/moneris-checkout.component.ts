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

  @Input()
  ticket = "";

  private readonly initialCheckoutData = {
    successs: false,
    loading: false,
    err: "",
  };

  public checkOutData = {
    ...this.initialCheckoutData,
  };
  constructor() {}

  public resetCheckoutState() {
    this.checkOutData = {
      ...this.initialCheckoutData,
    };
  }

  private startLoading() {
    this.checkOutData = {
      ...this.initialCheckoutData,
      loading: true,
    };
  }

  private setError(err: Error) {
    this.checkOutData = {
      ...this.initialCheckoutData,
      err: err?.message?.length
        ? err.message
        : "Unable to communicate with moneris",
    };
  }

  ngOnInit(): void {
    //@ts-ignore
    var myCheckout = new monerisCheckout();
    myCheckout.setMode(environment.moneris_mode);
    myCheckout.setCheckoutDiv("monerisCheckout");
    myCheckout.setCallback("page_loaded", this.myPageLoad);
    myCheckout.setCallback("cancel_transaction", this.myCancelTransaction);
    myCheckout.setCallback("error_event", this.myErrorEvent);
    // myCheckout.setCallback("payment_receipt", myPaymentReceipt);
    // myCheckout.setCallback("payment_complete", myPaymentComplete);
    //ticket number goes here
    myCheckout.startCheckout(this.ticket);
  }

  private myPageLoad() {
    console.log("Loaded Moneris");
  }

  private myCancelTransaction(e: any) {
    console.log("Cancelled Moneris checkout. ");
    this.goBackCheckoutEvent.emit();
  }

  private myErrorEvent(e: any) {
    console.error("Error Moneris: ", e);
  }
}
