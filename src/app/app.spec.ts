import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('sanity test', () => {
  it('should succeed', () => {
    expect(true).toBe(true);
  });
});

describe('AppComponent inline template', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    debug = fixture.debugElement.query(By.css('h1'));
    element = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should display a title', () => {
    expect(element.textContent).toContain(component.title);
  });

  it('should update the title', () => {
    component.title = 'New Title';
    fixture.detectChanges();
    expect(element.textContent).toContain('New Title');
  });

});
