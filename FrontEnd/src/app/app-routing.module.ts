import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileGuard} from "./guard/profile.guard";
import {RegisterComponent} from "./components/register/register.component";
import {CategoryComponent} from "./components/category/category.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate:[ProfileGuard]
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'category/:catName', component: CategoryComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'search', component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
