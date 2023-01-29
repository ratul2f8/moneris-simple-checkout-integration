import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MonerisCheckoutModule } from "./moneris-checkout/moneris-checkout.module";
import { OrderPlacementModule } from "./order-placement/order-placement.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MonerisConfigModule } from "./moneris-config/moneris-config.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MonerisCheckoutModule,
    OrderPlacementModule,
    MonerisConfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
