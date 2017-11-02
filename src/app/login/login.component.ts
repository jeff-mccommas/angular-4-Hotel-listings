import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../shared/data.service";
import {ActivatedRoute} from "@angular/router";
import {HotelService} from "../shared/hotel.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorMsg: string;
  successMsg: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private commonService: HotelService,private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
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
            // this.router.navigate('/HotelListings')
          }
        }, error => {
          console.log(error);
          this.toastr.error('Invalid username or password');
        });
    }
  }

}
