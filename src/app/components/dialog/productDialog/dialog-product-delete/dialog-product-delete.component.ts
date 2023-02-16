import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-product-delete',
  templateUrl: './dialog-product-delete.component.html',
  styleUrls: ['./dialog-product-delete.component.css']
})
export class DialogProductDeleteComponent {

  constructor(public dialog: MatDialog) {}



}
