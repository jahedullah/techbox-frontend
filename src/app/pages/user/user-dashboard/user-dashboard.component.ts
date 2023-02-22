import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  public userDashBoardLoaded: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.userDashBoardLoaded = true;
    }, 500);
    
  }

}
