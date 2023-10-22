import {Directive, HostListener, Input} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[appCopyDirective]'
})
export class CopyDirectiveDirective {

  @Input("copyClipboard") copy: string = "";

  @HostListener("click", ["$event"])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.copy)
      return;

    navigator.clipboard.writeText(this.copy.toString());
  }

}
