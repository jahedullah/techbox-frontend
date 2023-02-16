import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductDeleteComponent } from './dialog-product-delete.component';

describe('DialogProductDeleteComponent', () => {
  let component: DialogProductDeleteComponent;
  let fixture: ComponentFixture<DialogProductDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
