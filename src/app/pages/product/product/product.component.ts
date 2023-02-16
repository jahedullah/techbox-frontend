import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductAddComponent } from 'src/app/components/dialog/productDialog/dialog-product-add/dialog-product-add.component';
import { DialogProductDeleteComponent } from 'src/app/components/dialog/productDialog/dialog-product-delete/dialog-product-delete.component';
import { DialogProductPatchComponent } from 'src/app/components/dialog/productDialog/dialog-product-patch/dialog-product-patch.component';
import { DialogProductUpdateComponent } from 'src/app/components/dialog/productDialog/dialog-product-update/dialog-product-update.component';
import { Product } from 'src/app/models/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  public products: Product[] = [];
  public product?: Product;
  public productId: number = 0;
  public productsLoaded: boolean = false;


  constructor(private productService: ProductService, private snack: MatSnackBar, public loginService: LoginService, public dialog: MatDialog, private userService: UserService){

  }
  ngOnInit(): void {
    this.getProducts();
  }
  
  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.productsLoaded = true;
      },
      (error: HttpErrorResponse) => {
        this.snack.open(error.message, '',{
          duration: 1300
        });
      }
      );
  }


  openUpdateDialog(id: number){
    this.dialog.open(DialogProductUpdateComponent, {
      data : {productId : id}
    });

  }

  openAddDialog(){
    this.dialog.open(DialogProductAddComponent);

  }

  openPatchDialog(id: number){
    this.dialog.open(DialogProductPatchComponent, {
      data : {productId : id}
    });

  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogProductDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  wishlistProduct(productId: number): void{
    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        console.log('success');
        console.log(user.id); 
        const userId = user.id;
        this.userService.productAddToWishList(userId, productId).subscribe(
          (response: Product) => {
            this.snack.open("Added to wishlist", '',{
              duration: 1300,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              
            
            })
            this.product = response;
            console.log(this.product);
          },
          (error) => {
            // this.snack.open(error.message, '', {
            //   duration: 1300
            // });
            console.log(error);
          }
        );
      },
      (error) => {
        console.log('Error!');
        console.log(error);
        this.snack.open(error.message, '', {
          duration: 1500
        });
      }
    );

  }

}
