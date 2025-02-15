import { ElementRef, Renderer2 } from "@angular/core";
import { Constructor } from '../constructor';

/**
 * In order to be colorable, our class must implement this property
 */
export interface DaffColorable {
    color: DaffPalette;
}

/**
 * These are the valid options that can be passed to a DaffColorable component
 */
export type DaffPalette = 
    "primary" | "secondary" | "accent" | "tertiary" | //TODO: damienwebdev Deprecate accent
    "black" | "white" | 
    "theme" | "theme-contrast" | undefined;

enum DaffPaletteEnum {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    ACCENT = "accent", //TODO: damienwebdev Deprecate accent
    TERTIARY = "tertiary",
    BLACK = "black",
    WHITE = "white",
    THEME = "theme",
    THEMECONTRAST = "theme-contrast"
}
interface HasElementRef {
    _elementRef: ElementRef;
    _renderer: Renderer2;
}

/**
 * This should be a trait, but typescript only supports mixins.
 * See: https://github.com/Microsoft/TypeScript/issues/311
 * 
 * Turns out the material team followed the same path with the color mixin.
 * https://github.com/angular/material2/blob/master/src/lib/core/common-behaviors/color.ts
 */
export function 
    daffColorMixin<T extends Constructor<HasElementRef>>(Base: T, defaultColor?: DaffPalette) {
    return class extends Base {
        //TODO move this back to private in Typescript 3.1
        _color: DaffPalette;

        get color(): DaffPalette{return this._color;}
        set color(value: DaffPalette) {
            //Handle the default color
            const incomingColor = value || defaultColor;

            if(incomingColor !== undefined && !colorInPalette(incomingColor)){
                throw new TypeError(incomingColor + " is not a valid color for the DaffPalette");   
            }

            if(incomingColor !== this._color){ //Only run the dom-render if a change occurs
                //Remove the old color
                if(this._color){
                    this._renderer.removeClass(this._elementRef.nativeElement, `daff-${this._color}`);
                }

                if(incomingColor){
                    this._renderer.addClass(this._elementRef.nativeElement, `daff-${incomingColor}`);
                }

                this._color = incomingColor;
            }   
        }

        constructor(...args: any[]) {
            super(...args);
            this.color = defaultColor;
        }
    }
}

export function colorInPalette(color: string) : boolean{
    return (<any>Object).values(DaffPaletteEnum).includes(color)
}