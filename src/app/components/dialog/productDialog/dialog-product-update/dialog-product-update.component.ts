import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductUpdate } from 'src/app/models/productUpdate';
import { ProductComponent } from 'src/app/pages/product/product/product.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dialog-product-update',
  templateUrl: './dialog-product-update.component.html',
  styleUrls: ['./dialog-product-update.component.css']
})
export class DialogProductUpdateComponent{
 
  public productToUpdate: ProductUpdate = {
    name: '',
    vendor: '',
    price: 0,
    imageUrl: ''
  };
  
  constructor(private snack: MatSnackBar,private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: { productId: number }){


  }

  updateProduct(): void{
    this.productService.updateProduct(this.productToUpdate, 29).subscribe(
      (response: Product) => {
        this.snack.open(`Product updated successfully: ${response.name}`, '', {
          duration: 1300
        });
        
      },
      (error: HttpErrorResponse) => {
        this.snack.open(error.message, '', {
          duration: 1300
        });
      }
    );
  }
  



}
