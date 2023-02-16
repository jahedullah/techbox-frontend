import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit{
  public products: Product[] = [];
  public userId: number = 0;
  public productsLoaded: boolean = false;

  ngOnInit(): void {
    this.getUserProducts();
  }

  constructor (private userService: UserService, private snack: MatSnackBar, private loginService: LoginService){

  }


  public getUserProducts(): void {
    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        console.log('success');
        console.log(user.id); 
        this.userId = user.id;
        this.userService.getUserProducts(this.userId).subscribe(
          (response: Product[]) => {
            this.products = response;
            this.productsLoaded = true;
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
