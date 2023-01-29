import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonerisConfigComponent } from "./moneris-config.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [MonerisConfigComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MonerisConfigComponent],
})
export class MonerisConfigModule {}
