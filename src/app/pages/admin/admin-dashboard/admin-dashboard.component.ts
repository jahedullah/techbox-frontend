import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  public adminDashBoardLoaded: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.adminDashBoardLoaded = true;
    }, 500);
    
  }

}
