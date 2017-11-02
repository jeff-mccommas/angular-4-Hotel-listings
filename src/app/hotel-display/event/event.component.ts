import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [DataService]
})
export class EventComponent implements OnInit {
  eventForm:FormGroup
  hotels: Array<any>;
  @Output() childEvent = new EventEmitter();
  constructor(private  _dataService: DataService,  private route: ActivatedRoute, private toastr: ToastrService) {
    // Access the Data Service's getUsers() method we defined
    this._dataService.gethotels()
      .subscribe(res => this.hotels = res);
  }
  createEventForm() {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      company: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Description: new FormControl(),
      eventDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
      capacity: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rooms: new FormControl('', [Validators.required, Validators.minLength(5)]),
      inputAddress: new FormControl('', [Validators.required]),
      inputCity: new FormControl('', [Validators.required, Validators.minLength(5)]),
      inputState: new FormControl('', [Validators.required, Validators.minLength(5)]),
      inputZip: new FormControl('', [Validators.required, Validators.minLength(5)]),

    })
  }
  ngOnInit(): void {
  this.createEventForm();
  }
  get eventName() {
    return this.eventForm.get('eventName');
  }

  get company() {
    return this.eventForm.get('company');
  }

  get inputAddress() {
    return this.eventForm.get('inputAddress');
  }

  get email() {
    return this.eventForm.get('email');
  }

  get rooms() {
    return this.eventForm.get('rooms');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get inputCity() {
    return this.eventForm.get('inputCity');
  }

  get inputState() {
    return this.eventForm.get('inputState');
  }

  get inputZip() {
    return this.eventForm.get('inputZip');
  }
  get Description() {
    return this.eventForm.get('Description');
  }
  save(): void {
    let eventObj = this
    var eventData = {
      eventName: eventObj.eventName.value,
      Description: eventObj.Description.value,
      company: eventObj.company.value,
      inputAddress: eventObj.inputAddress.value,
      email: eventObj.email.value,
      rooms: eventObj.rooms.value,
      capacity: eventObj.capacity.value,
      inputCity: eventObj.inputCity.value,
      inputState: eventObj.inputState.value,
      inputZip: eventObj.inputZip.value
    };
    // console.log(eventData);
    this._dataService.addEventToHotel(this.route.snapshot.params['id'], eventData)
    .subscribe(res => {
      this.toastr.error('Event created successfully.');
      this.childEvent.emit('reloadreviewslist');
      this.eventForm.reset();
      this.createEventForm();
    });
  }
  

}
