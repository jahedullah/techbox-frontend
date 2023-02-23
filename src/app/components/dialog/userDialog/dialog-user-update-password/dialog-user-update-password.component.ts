import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPassChangeReq } from 'src/app/models/userPassChangeReq';
import { UserPassChangeResp } from 'src/app/models/userPassChangeResp';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-user-update-password',
  templateUrl: './dialog-user-update-password.component.html',
  styleUrls: ['./dialog-user-update-password.component.css']
})
export class DialogUserUpdatePasswordComponent {

  public  userPassChangeReq: UserPassChangeReq = {
    oldPassWord: '',
    newPassWord: '',
    confirmPassWord: ''
  }

  

  constructor(private snack: MatSnackBar, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data : {userId : number}){
  }

  updateUserPassword(){
    this.userService.updateUserPassword(this.userPassChangeReq, this.data.userId).subscribe(
      (response: UserPassChangeResp) => {

        Swal.fire('Success', 'password has been updated' , 'success');
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        const errorMsgs = Object.values(error.error).join(' | ');
        this.snack.open(`Error updating password: ${errorMsgs}`, '', {
          duration: 5000
        });
      }
    );
  }

  }


