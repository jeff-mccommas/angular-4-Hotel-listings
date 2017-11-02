import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {DataService} from "../../shared/data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  headerLoginForm:FormGroup

  constructor(private toastr: ToastrService,private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.headerLoginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
    }
  get username() {
    return this.headerLoginForm.get('username');
  }
  get password() {
    return this.headerLoginForm.get('password');
  }
  login = function () {
    let userinput = this;
    var user = {
      username: userinput.username.value,
      password: userinput.password.value
    };
    let body: string = JSON.stringify(user);
    if (!userinput.username.value || !userinput.password.value) {
      this.toastr.error('Please provide a username and a password.');
    } else {

      this.dataService.loginUser(body).subscribe(x => {
        this.toastr.success('Successful login');
        if (x.token) {
          localStorage.setItem("authToken", x.token);
          localStorage.setItem("userloggedin", userinput.username.value);
          this.route.navigate(['/HotelListings']);
        }
      }, error => {
        this.toastr.error('Invalid username or password');
      });
    }
  }


}
