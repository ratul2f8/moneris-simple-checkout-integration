import { DOCUMENT, isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { IMonerisConfigForm } from "../moneris-config/types/moneris-config.types";
import {
  IBasicMonerisCheckoutPayload,
  IMonerisBasicTicketServiceParam,
} from "./types/basic-moneris-checklout-payload.types";
@Injectable({
  providedIn: "root",
})
export class MonerisCheckoutService {
  is_server: Boolean;
  base_url: string;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional()
    @Inject(Request)
    private request: any,
    @Inject(DOCUMENT)
    private document: Document
  ) {
    this.is_server = isPlatformServer(platformId);

    if (this.is_server) {
      this.base_url = this.request?.headers?.referer;
    } else {
      this.base_url = this.document.location.origin + "/";
    }
  }

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
        txn_total: String(+payload.txn_total + +tax_amount),
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
    return this.httpClient.post<{ ticket: string; success: boolean }>(
      `${this.base_url + "api/moneris_ticket"}`,
      payload
    );
  }
}
