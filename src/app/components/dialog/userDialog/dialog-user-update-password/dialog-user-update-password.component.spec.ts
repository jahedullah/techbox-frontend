import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserUpdatePasswordComponent } from './dialog-user-update-password.component';

describe('DialogUserUpdatePasswordComponent', () => {
  let component: DialogUserUpdatePasswordComponent;
  let fixture: ComponentFixture<DialogUserUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserUpdatePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
