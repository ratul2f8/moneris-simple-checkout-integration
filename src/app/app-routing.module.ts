import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderPlacementComponent } from "./order-placement/order-placement.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: OrderPlacementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
