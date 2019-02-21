import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaffButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { DaffPalette } from '../../core/colorable/colorable';

@Component({
  template: `
    <a daff-button [color]="color">Link Daff Button</a>
    <a daff-stroked-button [color]="color">Link Daff Stroked Button</a>
    <a daff-raised-button [color]="color">Link Daff Raised Button</a>
    <a daff-icon-button [color]="color">Link Daff Icon Button</a>
    <button daff-button [color]="color">Button Daff Button</button>
    <button daff-stroked-button [color]="color">Button Daff Stroked Button</button>
    <button daff-raised-button [color]="color">Button Daff Raised Button</button>
    <button daff-icon-button [color]="color">Button Daff Icon Button</button>
  `
})
class WrapperComponent {
  color: DaffPalette;
}

describe('DaffButtonComponent', () => {
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DaffButtonComponent,
        WrapperComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(wrapper).toBeTruthy();
  });

  describe('daff-button',() => {
    it('should add a class of `daff-button` to its host element', () => {
      expect(fixture.debugElement.query(By.css('a[daff-button]')).nativeElement.classList.contains('daff-button')).toEqual(true);

      expect(fixture.debugElement.query(By.css('button[daff-button]')).nativeElement.classList.contains('daff-button')).toEqual(true);
    });
  });

  describe('daff-stroked-button',() => {
    it('should add a class of `daff-stroked-button` to its host element', () => {
      expect(fixture.debugElement.query(By.css('a[daff-stroked-button]')).nativeElement.classList.contains('daff-stroked-button')).toEqual(true);

      expect(fixture.debugElement.query(By.css('button[daff-stroked-button]')).nativeElement.classList.contains('daff-stroked-button')).toEqual(true);
    });
  });

  describe('daff-raised-button',() => {
    it('should add a class of `daff-raised-button` to its host element', () => {
      expect(fixture.debugElement.query(By.css('a[daff-raised-button]')).nativeElement.classList.contains('daff-raised-button')).toEqual(true);

      expect(fixture.debugElement.query(By.css('button[daff-raised-button]')).nativeElement.classList.contains('daff-raised-button')).toEqual(true);
    });
  });

  describe('daff-icon-button', () => {
    it('should add a class of `daff-icon-button` to its host element', () => {
      expect(fixture.debugElement.query(By.css('a[daff-icon-button]')).nativeElement.classList.contains('daff-icon-button')).toEqual(true);

      expect(fixture.debugElement.query(By.css('button[daff-icon-button]')).nativeElement.classList.contains('daff-icon-button')).toEqual(true);
    });
  }); 

  describe('using a colored variant of a button',() => {
    let buttonDE;

    it('should set a color class on the button', () => {
      wrapper.color = "primary";
      fixture.detectChanges();
      
      buttonDE = fixture.debugElement.query(By.css('button[daff-button]'));
      expect(buttonDE.nativeElement.classList.contains('daff-primary')).toEqual(true);
    });

    it('should set the default color to black', () => {
      buttonDE = fixture.debugElement.query(By.css('button[daff-button]'));
      expect(buttonDE.nativeElement.classList.contains('daff-black')).toEqual(true);
    });
  });
});
