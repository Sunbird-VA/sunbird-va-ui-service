import { TestBed } from '@angular/core/testing';

import { DiscussionDetailsService } from './discussion-details.service';

describe('DiscussionDetailsService', () => {
  let service: DiscussionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
