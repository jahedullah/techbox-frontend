import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor() {}

  public user = {
    firstName: '',
    lastName: '',
    email: '',  
    password: '',
    mobileNumber: '',
    userType: ''
  }

  ngOnInit(): void {
    
  }

  formSubmit() {
    alert('submit');
    console.log(this.user);
  }

}
