import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    email : '',
    password: ''
  }
  constructor(private snack: MatSnackBar, private login : LoginService) {

  }
  
  ngOnInit(): void {
    
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
        this.login.loginUser(data.accessToken)

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            //redirect ...if User: User-DashBoard
            //redirect ...if Admin: Admin-DashBoard
          }
        );
      },
      (error) => {
        console.log('Error !');
        console.log(error);
      }
    )
  }

}
