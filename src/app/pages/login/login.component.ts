import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginLoaded: boolean = false;

  loginData = {
    email : '',
    password: ''
  }
  constructor(private snack: MatSnackBar, private login : LoginService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.loginLoaded = true;
  }

  formSubmit() {
    console.log("submit clicked");
    if(this.loginData.email.trim() == '' || this.loginData.email == null){
      this.snack.open('hello! email please. ','',{
        duration: 1300
      })
    }
    else if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open('hello! password please. ','',{
        duration: 1300
      })
      return;
    };
    

    //request to server to log in the user
    this.login.generateToken(this.loginData).subscribe(
      (data: any) =>{
        console.log('success');
        console.log(data); 

        //login
        this.login.loginUser(data.accessToken, data.refreshToken)

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            const userType = user.userType
            //redirect ...if User: User-DashBoard
            //redirect ...if Admin: Admin-DashBoard
            if(userType == 'user'){
              // window.location.href = '/user-dashboard'
              this.router.navigate(['user-dashboard']);
            } else if(userType == 'admin'){
              // window.location.href = '/admin-dashboard'
              this.router.navigate(['admin-dashboard']);
            }else{
              this.login.logout();
            }

 
          }
        );
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open("Oops! Bad Credentials",'',{
          duration: 1500
        })
      }
    )
  }

  resetForm() {
    this.loginData = {
      email: '',
      password: ''
    };
  }

}
