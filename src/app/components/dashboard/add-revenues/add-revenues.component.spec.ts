import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevenuesComponent } from './add-revenues.component';

describe('AddRevenuesComponent', () => {
  let component: AddRevenuesComponent;
  let fixture: ComponentFixture<AddRevenuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRevenuesComponent]
    });
    fixture = TestBed.createComponent(AddRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
