import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  email: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  loginMessage: string;
  // @ts-ignore
  fieldTextType: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if(authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if(form.invalid) {
      return;
    }

    form.reset();
    this.userService.loginUser(email, password);

    this.userService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      setTimeout(() => {
        this.loginMessage = '';
      }, 20000);
    });

  }

}
