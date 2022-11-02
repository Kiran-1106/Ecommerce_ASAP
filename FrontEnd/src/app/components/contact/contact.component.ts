import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  // @ts-ignore
  contactMessage: string;

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      message: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }


  ngOnInit(): void {
  }

  contact() {

    if(this.contactForm.invalid) {
      return;
    }

    this.contactMessage = 'We will get back to you'
    this.contactForm.reset();
  }
}
