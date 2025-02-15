import { Component, ViewEncapsulation, NgZone, ElementRef, Output, EventEmitter } from '@angular/core';

import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

/**
 * DaffSidebar is heavily based upon the work done by the @angular/material2
 * team on `mat-drawer` and `mat-sidenav`. `daff-sidebar` is intended to be
 * a simplified version (with a different design) of `mat-drawer` which 
 * follows a stricter `dumb` component pattern than `mat-drawer`
 */
@Component({
  selector: 'daff-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: '<ng-content></ng-content>',
  host: {
    'class': 'daff-sidebar'
  },
  encapsulation: ViewEncapsulation.None
})
export class DaffSidebarComponent {
  /**
   * Event fired when `ESC` key is pressed when the sidebar has focus
   */
  @Output() escapePressed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone
    ) {

    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed.
     *
     */
    this._ngZone.runOutsideAngular(() => {
      fromEvent<KeyboardEvent>(this._elementRef.nativeElement, 'keydown').pipe(
          filter(event => event.key === "Escape")
      ).subscribe(event => this._ngZone.run(() => {
          this.escapePressed.emit();
          event.stopPropagation();
      }));
    });
  }
}
