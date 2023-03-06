import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit{
  public user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userType: ''
  };
  public products: Product[] = [];
  public product?: Product;
  public productsLoaded: boolean = false;

  ngOnInit(): void {
    console.log("user-product onInit")
    this.getUserProducts();
  }

  constructor (private userService: UserService, private snack: MatSnackBar, private loginService: LoginService, private router: Router,
    private location: Location){

  }


  public getUserProducts(): Product[] {
    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        console.log('success');
        console.log(user.id); 
        const userId = user.id;
        this.userService.getUserProducts(userId).subscribe(
          (response: Product[]) => {
            this.productsLoaded = true;
            return this.products = response;
            
          },
          (error: HttpErrorResponse) => {
            this.snack.open(error.message, '', {
              duration: 1300
            });
          }
        );
      },
      (error) => {
        console.log('Error!');
        console.log(error);
        this.snack.open('Oops! No Users Found', '', {
          duration: 1500
        });
      }
    );
    return this.products;
  }

  // public getUserProducts(): Product[] {
  //   this.user = this.loginService.getCurrentUser();
  //   console.log('success');
  //   console.log(this.user.id); 
  //       this.userService.getUserProducts(this.user.id).subscribe(
  //         (response: Product[]) => {
  //           this.productsLoaded = true;
  //           return this.products = response;
            
  //         },
  //         (error: HttpErrorResponse) => {
  //           this.snack.open(error.message, '', {
  //             duration: 1300
  //           });
  //         });
  //       console.log('Error!');
  //       this.snack.open('Oops! No Users Found', '', {
  //         duration: 1500
  //       });
  //   return this.products;
  // }

  deleteUserProducts(productId: number): void {
    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        console.log('success');
        console.log(user.id); 
        const userId = user.id;
        this.userService.productRemoveFromWishList(userId, productId).subscribe(
          (response: Product) => {
            this.product = response;
            // window.location.reload();
            const index = this.products.findIndex(p => p.id === productId);
            if (index !== -1) {
              // Remove the product from the products array
              this.products.splice(index, 1);
            }

            
          },
          (error: HttpErrorResponse) => {
            this.snack.open(error.message, '', {
              duration: 1300
            });
          }
        );
      },
      (error) => {
        console.log('Error!');
        console.log(error);
        this.snack.open('Oops! No Users Found', '', {
          duration: 1500
        });
      }
    );
  }

}
