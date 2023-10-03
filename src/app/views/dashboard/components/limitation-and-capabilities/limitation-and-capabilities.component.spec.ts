import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitationAndCapabilitiesComponent } from './limitation-and-capabilities.component';

describe('LimitationAndCapabilitiesComponent', () => {
  let component: LimitationAndCapabilitiesComponent;
  let fixture: ComponentFixture<LimitationAndCapabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitationAndCapabilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitationAndCapabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
