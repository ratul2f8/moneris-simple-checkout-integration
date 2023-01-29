import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { IMonerisConfigForm } from "./types/moneris-config.types";
@Component({
  selector: "app-moneris-config",
  providers: [NgbModalConfig, NgbModal],
  templateUrl: "./moneris-config.component.html",
  styleUrls: ["./moneris-config.component.scss"],
})
export class MonerisConfigComponent implements AfterViewInit {
  @Output()
  on_close = new EventEmitter();

  @ViewChild("config_modal")
  //@ts-ignore
  content: ElementRef;

  current_env: string;
  current_moneris_url: string;
  current_moneris_script: string;

  moneris_config = new FormGroup({
    store_id: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    api_token: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    checkout_id: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = "static";
    config.keyboard = false;

    this.current_env = environment.moneris_mode;
    this.current_moneris_url = environment.moneris_server;
    this.current_moneris_script = environment.moneris_script_src;
  }
  ngAfterViewInit(): void {
    this.populate_data_from_local_storage();
    this.open();
  }

  private populate_data_from_local_storage() {
    try {
      const parsedData = JSON.parse(
        localStorage.getItem("moneris_config") ?? ""
      ) as IMonerisConfigForm;
      if (Object.keys(parsedData).length) {
        this.api_token?.setValue(
          parsedData?.api_token?.length ? parsedData?.api_token : ""
        );
        this.store_id?.setValue(
          parsedData?.store_id?.length ? parsedData.store_id : ""
        );
        this.checkout_id?.setValue(
          parsedData?.checkout_id?.length ? parsedData?.checkout_id : ""
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  handle_close() {
    this.modalService.dismissAll();
    this.on_close.emit();
  }
  save_changes() {
    this.handle_close();
    try {
      localStorage.setItem(
        "moneris_config",
        JSON.stringify(this.moneris_config.getRawValue())
      );
    } catch (e) {
      console.error(e);
    }
  }
  open() {
    this.modalService.open(this.content);
  }

  //form properties
  get api_token() {
    return this.moneris_config.get("api_token");
  }

  get store_id() {
    return this.moneris_config.get("store_id");
  }

  get checkout_id() {
    return this.moneris_config.get("checkout_id");
  }
}
