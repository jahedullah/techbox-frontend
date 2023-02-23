import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserUpdatePasswordComponent } from 'src/app/components/dialog/userDialog/dialog-user-update-password/dialog-user-update-password.component';
import { DialogUserUpdateComponent } from 'src/app/components/dialog/userDialog/dialog-user-update/dialog-user-update.component';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  public userProfileLoaded: boolean = false;
  public user?: User;
  constructor(private loginService: LoginService, private dialog: MatDialog){

  }

  ngOnInit(): void {

    setTimeout(() => {
      this.user = this.loginService.getUser();
      this.userProfileLoaded = true;
    }, 300)
    
  }

  openUpdateDialog(user: any){
    this.dialog.open(DialogUserUpdateComponent, {
      data : {user : user}
    });

  }

  openUpdatePasswordDialog(userId: any){
    this.dialog.open(DialogUserUpdatePasswordComponent, {
      data : {userId : userId}
    });

  }

}
