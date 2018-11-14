import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a `daffio-header-container` inside a `daffio-sidebar-viewport-container`', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let sidebarViewport = fixture.debugElement.queryAll(By.css('daffio-sidebar-viewport-container'));
    expect(sidebarViewport.length).toEqual(1);

    expect(sidebarViewport[0].queryAll(By.css('daffio-header-container')).length).toEqual(1);
  })
});
