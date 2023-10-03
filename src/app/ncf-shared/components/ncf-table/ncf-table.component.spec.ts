import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcfTableComponent } from './ncf-table.component';

describe('NcfTableComponent', () => {
  let component: NcfTableComponent;
  let fixture: ComponentFixture<NcfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcfTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
