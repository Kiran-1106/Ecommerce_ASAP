import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  cartData: CartModelServer;
  // @ts-ignore
  cartTotal: number;
  // @ts-ignore
  authState: boolean;

  constructor(public cartService: CartService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  selectCategory(catName: string) {
    this.router.navigate([`/category`, catName]).then();
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

}
