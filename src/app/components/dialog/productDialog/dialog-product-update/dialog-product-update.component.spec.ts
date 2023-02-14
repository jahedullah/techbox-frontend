import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductUpdateComponent } from './dialog-product-update.component';

describe('DialogProductUpdateComponent', () => {
  let component: DialogProductUpdateComponent;
  let fixture: ComponentFixture<DialogProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
