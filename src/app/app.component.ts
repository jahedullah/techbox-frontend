import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from './users';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "TechBox";
  public users: User[] = [];

  constructor(private userService: UsersService){

  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void{

      const response = this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        
      }
      );
  }



}
