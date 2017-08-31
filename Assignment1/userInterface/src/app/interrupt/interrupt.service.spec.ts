import { TestBed, inject } from '@angular/core/testing';

import { InterruptService } from './interrupt.service';

describe('InterruptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterruptService]
    });
  });

  it('should be created', inject([InterruptService], (service: InterruptService) => {
    expect(service).toBeTruthy();
  }));
});
