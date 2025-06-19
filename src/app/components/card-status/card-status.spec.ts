import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatus } from './card-status';

describe('CardStatus', () => {
  let component: CardStatus;
  let fixture: ComponentFixture<CardStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
