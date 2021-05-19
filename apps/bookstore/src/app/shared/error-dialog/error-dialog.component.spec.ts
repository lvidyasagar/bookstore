import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';

import { ErrorDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  const data = {
    heading: 'Error',
    message: 'test',
    buttonText: 'Ok',
  };
  const close = () => {};

  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ErrorDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
        {
          provide: MatDialogRef,
          useValue: close,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show sent data on the dialog', () => {
    expect(component.data.buttonText).toBe('Ok');
    expect(component.data.heading).toBe('Error');
    expect(component.data.message).toBe('test');
  });
});
