import { TestBed } from '@angular/core/testing';

import { FcViewerService } from './fc-viewer.service';

describe('FcViewerService', () => {
  let service: FcViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
