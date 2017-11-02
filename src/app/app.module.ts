import { HotelService } from './shared/hotel.service';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HotelListComponent} from './hotel-list/hotel-list.component';
import {HotelDisplayComponent} from './hotel-display/hotel-display.component';
import {
  RouterModule, Routes
} from '@angular/router'
  ;
import {AuthGuard} from "./shared/gaurd";
import {DataService} from "./shared/data.service";
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from "./home/home.component";
import { ReviewComponent } from './hotel-display/review/review.component';
import { EventComponent } from './hotel-display/event/event.component';
import { HeaderLoginComponent } from './header/header-login/header-login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NewListingComponent } from './hotel-list/new-listing/new-listing.component';
import {FileSelectDirective, FileDropDirective} from "ng2-file-upload";

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'HotelDisplay/:id', component: HotelDisplayComponent},
  {path: 'HotelListings', component: HotelListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: HotelListComponent},
  {path: 'newListing', component: NewListingComponent},
  {path: '', pathMatch: 'full', redirectTo: 'Home'}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HotelListComponent,
    HotelDisplayComponent,
    StarRatingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReviewComponent,
    EventComponent,
    HeaderLoginComponent,
    NewListingComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports:[
    StarRatingComponent
  ],
  providers: [DataService, HotelService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
