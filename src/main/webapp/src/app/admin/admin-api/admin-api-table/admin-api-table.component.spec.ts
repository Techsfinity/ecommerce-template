import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApiTableComponent } from './admin-api-table.component';

describe('AdminApiTableComponent', () => {
  let component: AdminApiTableComponent;
  let fixture: ComponentFixture<AdminApiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
