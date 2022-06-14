import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExchangesModalComponent } from './my-exchanges-modal.component';

describe('MyExchangesModalComponent', () => {
  let component: MyExchangesModalComponent;
  let fixture: ComponentFixture<MyExchangesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExchangesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExchangesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
