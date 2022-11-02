import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CategoryComponent,
    ContactComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
