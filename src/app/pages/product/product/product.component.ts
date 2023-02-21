import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
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
import { UserProductsComponent } from '../../user-products/user-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ProductComponent implements OnInit{
  public products: Product[] = [];
  public userProducts: Product[] = [];
  public userProductsObj: {[key : number] : boolean} = {};
  public product?: Product;
  public productId: number = 0;
  public productsLoaded: boolean = false;

  constructor(private productService: ProductService, private snack: MatSnackBar, public loginService: LoginService, public dialog: MatDialog, private userService: UserService){

  }
  ngOnInit(): void {
    this.getProducts();
    let user = this.loginService.getUser();
    if (user != null && user.hasOwnProperty('id')) {
    let userId = user.id;
    this.userService.getUserProducts(userId).subscribe(
        (response: Product[]) => {
          this.userProducts = response;
          this.userProducts.forEach(product => {
            this.userProductsObj[product.id] = true;
          });
          console.log(this.userProductsObj);
        },
        (error: HttpErrorResponse) => {
          this.snack.open(error.message, '', {
            duration: 1300
          });
        }
      );

      }
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


  openUpdateDialog(product: Product){
    this.dialog.open(DialogProductUpdateComponent, {
      data : {product: product}
    });

  }

  openAddDialog(){
    this.dialog.open(DialogProductAddComponent);

  }

  openPatchDialog(product: Product){
    this.dialog.open(DialogProductPatchComponent, {
      data : {product : product}
    });

  }

  openDeleteDialog(productId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogProductDeleteComponent, {
      data: {productId: productId},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log("result ki?")
      if (result != undefined && result == "deleted") {
        console.log("dialogref closed")
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
          // Remove the product from the products array
          this.products.splice(index, 1);
        }
      }
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
            this.userProductsObj[productId] = true;
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

  isProductInWishlist(productId: number): boolean {
    return Boolean(this.userProductsObj[productId]);
  }

}
