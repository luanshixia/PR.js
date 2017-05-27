import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAppComponent } from './pr-app.component';

describe('PrAppComponent', () => {
  let component: PrAppComponent;
  let fixture: ComponentFixture<PrAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
