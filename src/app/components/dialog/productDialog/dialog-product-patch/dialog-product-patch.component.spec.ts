import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductPatchComponent } from './dialog-product-patch.component';

describe('DialogProductPatchComponent', () => {
  let component: DialogProductPatchComponent;
  let fixture: ComponentFixture<DialogProductPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductPatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
