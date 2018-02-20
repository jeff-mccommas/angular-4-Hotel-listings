import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../shared/data.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  // styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {
  hotelListingForm: FormGroup
  hotels: Array<any>;
  @Output() childEvent = new EventEmitter();


  constructor(private _dataService: DataService, private route: ActivatedRoute, private toastr: ToastrService) {

  }

  createHotelForm() {
    this.hotelListingForm = new FormGroup({
      hotelName: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
      hotelDescription: new FormControl('', [Validators.required]),

    })

  }

  ngOnInit(): void {
    this.createHotelForm();
  }

  get hotelName() {
    return this.hotelListingForm.get('hotelName');
  }

  get rating() {
    return this.hotelListingForm.get('rating');
  }

  get hotelDescription() {
    return this.hotelListingForm.get('hotelDescription');
  }

  save(): void {
    let eventObj = this
    var hotelData = {
      name: eventObj.hotelName.value,
      description: eventObj.hotelDescription.value,
      rating: eventObj.rating.value,
    };
    // console.log(hotelData);
    this._dataService.addHotelListing(this.route.snapshot.params['id'], hotelData)
      .subscribe(res => {
        this.toastr.success('hotel listing created successfully.');
        // this.childEvent.emit('reloadhotelslist');
        this.hotelListingForm.reset();
        this.createHotelForm();
        console.log(hotelData)

      });
  }


}


