import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(
    private userService: UserService,
    private snack: MatSnackBar
  ) {}

  public user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mobilenumber: '',
    usertype: ''
  }

  ngOnInit(): void {
    
  }

  formSubmit() {
    
    console.log(this.user);
    if(this.user.firstname == '' || this.user.firstname == null){
      this.snack.open('Yo! Whats your firstname?','',{
        duration: 1300,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data: any) =>{

        //if-success function
        console.log(data);
        Swal.fire('Success', 'user signed up with id ' + data.id, 'success');
      },
      (error) =>{
        //if-fails function
        console.log(error);
        this.snack.open(error.error.message, '',{
          duration: 1300
        })
      }
    )
  }

  resetForm() {
    this.user = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      mobilenumber: '',
      usertype: ''
    }
  }

}
