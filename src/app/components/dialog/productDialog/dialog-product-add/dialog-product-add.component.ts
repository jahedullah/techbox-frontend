import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductAddAndUpdate } from 'src/app/models/productAddAndUpdate';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-product-add',
  templateUrl: './dialog-product-add.component.html',
  styleUrls: ['./dialog-product-add.component.css']
})
export class DialogProductAddComponent {

  public productToAdd: ProductAddAndUpdate = {
    name: '',
    vendor: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private snack: MatSnackBar, private productService: ProductService) {
     
  }

  addProduct(): void {
    this.productService.addProduct(this.productToAdd).subscribe(
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
