import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductAddAndUpdate } from 'src/app/models/productAddAndUpdate';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-product-update',
  templateUrl: './dialog-product-update.component.html',
  styleUrls: ['./dialog-product-update.component.css']
})
export class DialogProductUpdateComponent{
  private allInputValid: boolean = false;
 
  public productToUpdate: ProductAddAndUpdate = {
    name: '',
    vendor: '',
    price: null,
    imageUrl: ''
  };
  
  constructor(private snack: MatSnackBar,private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: { product : Product}, private dialogref: MatDialogRef<DialogProductUpdateComponent>){


  }

  updateProduct(): void{

      // this checks is all of the fields are non-null or non-empty. !! this is Javascript double bang operator.

      this.allInputValid = (!!this.productToUpdate.name && !!this.productToUpdate.vendor && 
      !!this.productToUpdate.price && !!this.productToUpdate.imageUrl);

      if(this.allInputValid){

      this.productService.updateProduct(this.productToUpdate, this.data.product.id).subscribe(
        (response: Product) => {
          this.data.product.id = response.id;
          this.data.product.name = response.name;
          this.data.product.vendor = response.vendor;
          this.data.product.price = response.price;
          this.data.product.imageUrl = response.imageUrl;
          Swal.fire('Success', 'product has been updated ' + response.id, 'success');
          this.dialogref.close();
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          const errorMsgs = Object.values(error.error).join(' | ');
          this.snack.open(`Error updating product: ${errorMsgs}`, '', {
            duration: 5000
          });
        }
      );
      } else{

        this.productService.patchProduct(this.productToUpdate, this.data.product.id).subscribe(
          (response: Product) => {
            this.data.product.id = response.id;
            this.data.product.name = response.name;
            this.data.product.vendor = response.vendor;
            this.data.product.price = response.price;
            this.data.product.imageUrl = response.imageUrl;
            Swal.fire('Success', 'product has been patched ' + response.id, 'success');
            
            this.dialogref.close();
            
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
  // patchProduct(): void{
    


  //     this.productService.patchProduct(this.productToUpdate, this.data.product.id).subscribe(
  //       (response: Product) => {
  //         this.data.product.id = response.id;
  //         this.data.product.name = response.name;
  //         this.data.product.vendor = response.vendor;
  //         this.data.product.price = response.price;
  //         this.data.product.imageUrl = response.imageUrl;
  //         Swal.fire('Success', 'product has been patched ' + response.id, 'success');
          
  //         this.dialogref.close();
          
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log(error.error);
  //         const errorMsgs = Object.values(error.error).join(' | ');
  //         this.snack.open(`Error updating product: ${errorMsgs}`, '', {
  //           duration: 5000
  //         });
  //       }
  //     );
  //   }

    onSubmit(){
      this.updateProduct();
    }
  }
  

