import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldButtonComponent } from './sold-button.component';

describe('SoldButtonComponent', () => {
  let component: SoldButtonComponent;
  let fixture: ComponentFixture<SoldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
