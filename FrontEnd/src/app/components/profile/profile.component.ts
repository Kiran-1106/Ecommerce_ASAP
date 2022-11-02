import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {ResponseModel} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myUser: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map(user => {
          return user;
        })
      )
      // @ts-ignore
      .subscribe((data) => {
        this.myUser = data;
      });
  }

  logout() {
    this.userService.logout();
  }

}
