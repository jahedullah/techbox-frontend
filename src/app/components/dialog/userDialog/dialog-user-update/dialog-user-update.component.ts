import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userUpdate';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-user-update',
  templateUrl: './dialog-user-update.component.html',
  styleUrls: ['./dialog-user-update.component.css']
})
export class DialogUserUpdateComponent {

  public user: User;
  public userToUpdate: UserUpdate = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userType: ''
  };

  constructor(private snack: MatSnackBar, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data : {user : any}){
    this.user = this.data.user;

  }

  updateUser(){
    this.userService.updateUser(this.userToUpdate, this.user.id).subscribe(
      (response: User) => {
        this.user.id = response.id;
        this.user.firstName = response.firstName;
        this.user.lastName = response.lastName;
        this.user.email = response.email;
        this.user.mobileNumber = response.mobileNumber;
        this.user.userType = response.userType;
        this.snack.open(`User updated successfully: ${response.firstName}`, '', {
          duration: 2000
        });
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        const errorMsgs = Object.values(error.error).join(' | ');
        this.snack.open(`Error updating product: ${errorMsgs}`, '', {
          duration: 5000
        });
      }
    );
  }

}
