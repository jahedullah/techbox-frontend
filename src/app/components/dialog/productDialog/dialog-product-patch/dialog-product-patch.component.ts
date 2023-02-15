import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductAddAndUpdate } from 'src/app/models/productAddAndUpdate';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-product-patch',
  templateUrl: './dialog-product-patch.component.html',
  styleUrls: ['./dialog-product-patch.component.css']
})
export class DialogProductPatchComponent {

  public productToAdd: ProductAddAndUpdate = {
    name: '',
    vendor: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private snack: MatSnackBar, private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: { productId: number }) {
     
  }

  patchProduct(): void {
    this.productService.patchProduct(this.productToAdd, this.data.productId).subscribe(
      (response: Product) => {
        Swal.fire('Success', 'product has been added ' + response.id, 'success');
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        const errorMsgs = Object.values(error.error).join(' | ');
        this.snack.open(`Error updating product: ${errorMsgs}`, '', {
          duration: 5000
        });
      }
    );
  }

}
