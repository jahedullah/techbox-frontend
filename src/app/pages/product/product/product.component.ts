import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductAddComponent } from 'src/app/components/dialog/productDialog/dialog-product-add/dialog-product-add/dialog-product-add.component';
import { DialogProductUpdateComponent } from 'src/app/components/dialog/productDialog/dialog-product-update/dialog-product-update.component';
import { Product } from 'src/app/models/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  public products: Product[] = [];
  public productId: number = 0;


  constructor(private productService: ProductService, private snack: MatSnackBar, public login: LoginService, public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.getProducts();
  }
  
  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        this.snack.open(error.message, '',{
          duration: 1300
        });
      }
      );
  }

  // updateProduct(product: ProductUpdate): void {
  //   this.productService.updateProduct(product, this.productId).subscribe(
  //     (response: Product) => {
  //       this.snack.open(`Product updated successfully: ${response.name}`, '', {
  //         duration: 2000
  //       });
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.snack.open(error.message, '', {
  //         duration: 2000
  //       });
  //     }
  //   );
  // }


  openUpdateDialog(id: number){
    this.dialog.open(DialogProductUpdateComponent, {
      data : {productId : id}
    });

  }

  openAddDialog(){
    this.dialog.open(DialogProductAddComponent);

  }

}
