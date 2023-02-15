import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductAddComponent } from './dialog-product-add.component';

describe('DialogProductAddComponent', () => {
  let component: DialogProductAddComponent;
  let fixture: ComponentFixture<DialogProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
