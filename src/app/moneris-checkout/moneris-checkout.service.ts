import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IMonerisConfigForm } from "../moneris-config/types/moneris-config.types";
import {
  IBasicMonerisCheckoutPayload,
  IMonerisBasicTicketServiceParam,
} from "./types/basic-moneris-checklout-payload.types";
@Injectable({
  providedIn: "root",
})
export class MonerisCheckoutService {
  constructor(private readonly httpClient: HttpClient) {}

  public generateToken(params: IMonerisBasicTicketServiceParam) {
    const parsed_config = JSON.parse(
      localStorage.getItem("moneris_config") ?? ""
    ) as IMonerisConfigForm;
    const {
      // api_token,
      // checkout_id,
      // store_id,
      total,
      tax_description,
      tax_percentage,
      order_uuid,
    } = params;

    let payload: IBasicMonerisCheckoutPayload = {
      // api_token,
      // checkout_id,
      // store_id,
      ...parsed_config,
      txn_total: String(total),
      action: "preload",
      dynamic_descriptor: "dyndesc",
      language: "en",
      order_no: order_uuid,
    };
    if (tax_percentage && !isNaN(tax_percentage) && +tax_percentage < 100) {
      const tax_amount = parseFloat(
        String(total * (+tax_percentage / 100))
      ).toFixed(2);
      payload = {
        ...payload,
        txn_total: payload.txn_total + tax_amount,
        cart: {
          items: [],
          subtotal: String(total),
          tax: {
            amount: tax_amount,
            description: tax_description?.length ? tax_description : "Taxes",
            rate: String(tax_percentage),
          },
        },
      };
    }

    return this.httpClient.post<{ response: { ticket: string } }>(
      `${environment.moneris_server}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
