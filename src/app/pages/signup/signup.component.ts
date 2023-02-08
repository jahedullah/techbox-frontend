import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(
    private userService: UserService
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
    this.userService.addUser(this.user).subscribe(
      (data) =>{

        //if-success function
        console.log(data);
        alert('success');
      },
      (error) =>{
        //if-fails function
        console.log(error);
        alert('something went wrong');
      }
    )
  }

}
