import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductAddAndUpdate } from 'src/app/models/productAddAndUpdate';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dialog-product-update',
  templateUrl: './dialog-product-update.component.html',
  styleUrls: ['./dialog-product-update.component.css']
})
export class DialogProductUpdateComponent{
 
  public productToUpdate: ProductAddAndUpdate = {
    name: '',
    vendor: '',
    price: 0,
    imageUrl: ''
  };
  
  constructor(private snack: MatSnackBar,private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: { productId: number }){


  }

  updateProduct(): void{
    this.productService.updateProduct(this.productToUpdate, this.data.productId).subscribe(
      (response: Product) => {
        this.snack.open(`Product updated successfully: ${response.name}`, '', {
          duration: 1300
        });
        
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
