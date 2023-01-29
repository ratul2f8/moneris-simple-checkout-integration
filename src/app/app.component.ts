import { AfterViewInit, Component, OnInit, Renderer2 } from "@angular/core";
import { ScriptService } from "./script.service";
import { environment } from "src/environments/environment";
import { IMonerisConfigForm } from "./moneris-config/types/moneris-config.types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  open_config_window = false;
  render_checkout_page = false;
  constructor(
    private readonly scriptService: ScriptService,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.initializeMonerisConfigFromEnv();
    this.injectMonerisScript();
  }
  private initializeMonerisConfigFromEnv() {
    try {
      const { api_token, checkout_id, store_id } = environment;
      const dataToSet: IMonerisConfigForm = {
        api_token,
        checkout_id,
        store_id,
      };
      localStorage.setItem("moneris_config", JSON.stringify(dataToSet));
    } catch (e) {
      console.error(e);
    }
  }

  public toggleRenderChekoutPage() {
    this.render_checkout_page = !this.render_checkout_page;
  }

  toggle_config_window() {
    this.open_config_window = !this.open_config_window;
  }

  private injectMonerisScript() {
    const script = environment.moneris_script_src;
    const injected_script = this.scriptService.injectScript(
      this.renderer,
      script
    );
    injected_script.onload = () => {
      console.log("Moneris Script loaded");
    };
    injected_script.onerror = (e) => {
      console.error("Unable to load moneris script: ", e);
    };
  }
}
