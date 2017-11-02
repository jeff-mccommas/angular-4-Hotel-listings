import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {Router} from "@angular/router";
import {HotelService} from "../shared/hotel.service";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import {AuthGuard} from "./../shared/gaurd";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedInUser$: Observable<boolean>;    
  constructor(private dataService: DataService, private route: Router, private commonService: HotelService,private toastr: ToastrService, private authGuard: AuthGuard) { 
    // this.loggedIn = this.dataService.isLoggedIn;
    // console.log(this.loggedIn);
    
  }

  ngOnInit() {
    this.isLoggedIn$ = this.dataService.isLoggedIn; // {2}
    this.isLoggedInUser$ = this.dataService.isLoggedInUser; // {2}
    console.log(this.isLoggedIn$);
  }
  logout= function () {
    this.toastr.success('Successful logout');
    this.route.navigate(['/Home']);
    this.dataService.logoutUser();
  }
}



