import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTabComponent } from './orders-tab.component';

describe('OrdersTabComponent', () => {
  let component: OrdersTabComponent;
  let fixture: ComponentFixture<OrdersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
