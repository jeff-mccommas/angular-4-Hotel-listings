import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../../shared/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  addReviewForm:FormGroup;


  constructor(private _dataService: DataService, private route: ActivatedRoute, private toastr: ToastrService) {}
  createReviewForm () {
    this.addReviewForm = new FormGroup({
      reviewer: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      rating: new FormControl('', [Validators.required, Validators.min(1),Validators.max(5)]),
      reviewdescription: new FormControl('', [Validators.required, Validators.maxLength(50)]),

    })
  }
  ngOnInit() {
    this.createReviewForm();
  }
  get reviewer() {
    return this.addReviewForm.get('reviewer');

  }
  get rating() {
    return this.addReviewForm.get('rating');

  }
  get reviewdescription() {
    return this.addReviewForm.get('reviewdescription');

  }
  addReview= function () {
    let review = this
    var reviewData = {
      name: review.reviewer.value,
      rating: review.rating.value,
      review: review.reviewdescription.value
    };
    if (reviewData.name && reviewData.rating && reviewData.review) {
        this._dataService.addReviewToHotel(this.route.snapshot.params['id'], reviewData)
        .subscribe(res => {
          this.toastr.success('Review created successfully.');
          this.childEvent.emit('reloadreviewslist');
          this.eventForm.reset();
          this.createReviewForm();
        });
    }
  }

}
