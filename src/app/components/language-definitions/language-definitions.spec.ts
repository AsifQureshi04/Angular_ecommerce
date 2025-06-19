import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDefinitions } from './language-definitions';

describe('LanguageDefinitions', () => {
  let component: LanguageDefinitions;
  let fixture: ComponentFixture<LanguageDefinitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageDefinitions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDefinitions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
