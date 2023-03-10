import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductComponent } from './pages/product/product/product.component';
import { ProductService } from './services/product.service';
import {MatDialogModule} from '@angular/material/dialog';

import { DialogProductUpdateComponent } from './components/dialog/productDialog/dialog-product-update/dialog-product-update.component';
import { DialogProductAddComponent } from './components/dialog/productDialog/dialog-product-add/dialog-product-add.component';
import { DialogProductPatchComponent } from './components/dialog/productDialog/dialog-product-patch/dialog-product-patch.component';
import { UserProductsComponent } from './pages/user-products/user-products.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogProductDeleteComponent } from './components/dialog/productDialog/dialog-product-delete/dialog-product-delete.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DialogUserUpdateComponent } from './components/dialog/userDialog/dialog-user-update/dialog-user-update.component';
import { DialogUserUpdatePasswordComponent } from './components/dialog/userDialog/dialog-user-update-password/dialog-user-update-password.component';
import { tokenInterceptorProviders } from './services/token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProductComponent,
    DialogProductUpdateComponent,
    DialogProductAddComponent,
    DialogProductPatchComponent,
    UserProductsComponent,
    DialogProductDeleteComponent,
    UserProfileComponent,
    DialogUserUpdateComponent,
    DialogUserUpdatePasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [ProductService, tokenInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
