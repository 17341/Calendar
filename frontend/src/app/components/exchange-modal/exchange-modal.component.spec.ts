import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeModalComponent } from './exchange-modal.component';

describe('ExchangeModalComponent', () => {
  let component: ExchangeModalComponent;
  let fixture: ComponentFixture<ExchangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
