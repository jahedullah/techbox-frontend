import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-product-delete',
  templateUrl: './dialog-product-delete.component.html',
  styleUrls: ['./dialog-product-delete.component.css']
})
export class DialogProductDeleteComponent {

  constructor(private snack: MatSnackBar, public dialog: MatDialog, private dialogRef: MatDialogRef<DialogProductDeleteComponent> , private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data : {productId: number}) {}

  deleteProduct(){
    console.log("deleting");
    this.productService.deleteProduct(this.data.productId).subscribe(
      (response: Product) => {
        Swal.fire('Success', 'product has been deleted ' + response.id, 'success');
        this.dialogRef.close("deleted");
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        const errorMsgs = Object.values(error.error).join(' | ');
        this.snack.open(`Error updating product: ${errorMsgs}`, '', {
          duration: 5000
        });
      }
    );;
  }

}
