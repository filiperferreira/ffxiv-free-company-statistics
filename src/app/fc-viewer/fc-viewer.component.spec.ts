import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcViewerComponent } from './fc-viewer.component';

describe('FcViewerComponent', () => {
  let component: FcViewerComponent;
  let fixture: ComponentFixture<FcViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
