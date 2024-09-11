import { TestBed } from '@angular/core/testing';

import { ProductpostService } from './productpost.service';

describe('ProductpostService', () => {
  let service: ProductpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
