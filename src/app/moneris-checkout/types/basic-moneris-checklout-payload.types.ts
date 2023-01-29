export interface IMonerisBasicTicketServiceParam {
  // store_id: string,
  // api_token: string,
  // checkout_id: string,
  total: number;
  tax_percentage?: number;
  tax_description?: string;
  order_uuid: string;
}

export interface IBasicMonerisCheckoutPayload {
  store_id: string;
  api_token: string;
  checkout_id: string;
  txn_total: string;
  action: "preload";
  dynamic_descriptor: "dyndesc";
  language: "en";
  order_no: string;
  cart?: {
    items: Array<any>;
    subtotal: string;
    tax?: {
      amount: string;
      description: string;
      rate: string;
    };
  };
}
