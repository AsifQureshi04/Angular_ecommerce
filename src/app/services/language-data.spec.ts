import { TestBed } from '@angular/core/testing';

import { LanguageData } from './language-data';

describe('LanguageData', () => {
  let service: LanguageData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
