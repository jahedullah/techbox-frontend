import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product/product.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserProductsComponent } from './pages/user-products/user-products.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/Auth.guard';


import { UserGuard } from './services/user.guard';

const routes: Routes = [
{
  path:'signup',
  component: SignupComponent,
  pathMatch: 'full'
},
{
  path:'login',
  component: LoginComponent,
  pathMatch: 'full'
},
{
  path:'',
  component: HomeComponent,
  pathMatch: 'full'
},
{
  path:'admin-dashboard',
  component: AdminDashboardComponent,
  pathMatch: 'full',
  canActivate: [AdminGuard]
},
{
  path:'user-dashboard',
  component:UserDashboardComponent,
  pathMatch: 'full',
  canActivate: [UserGuard]
},
{
  path:'products',
  component: ProductComponent,
  pathMatch: 'full'
},
{
  path:'user-products',
  component: UserProductsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard]
},
{
  path:'user-profile',
  component: UserProfileComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
