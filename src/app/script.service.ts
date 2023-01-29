import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  public injectScript(renderer: Renderer2, script_src: string): HTMLScriptElement {
    const script = renderer.createElement("script");
    script.type = "text/javascript";
    script.src = script_src;
    renderer.appendChild(this.document.body, script);
    return script
  }
}
