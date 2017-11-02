import {
  HotelService
} from './../shared/hotel.service';
import {
  Component,
  OnInit,
  ElementRef,
  Input
} from '@angular/core';
import {
  Http,
  Headers,
  Response,
  RequestOptions
} from "@angular/http";
import {
  FileUploader
} from 'ng2-file-upload/ng2-file-upload';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import {
  DataService
} from '../shared/data.service';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
//define the constant url we would be uploading to.
const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-hotel-display',
  templateUrl: './hotel-display.component.html',
  styleUrls: ['./hotel-display.component.css'],
  providers: [DataService]
})
export class HotelDisplayComponent implements OnInit {
  hotelInfo: any;
  params: ParamMap;
  hotelId: any;
  http: Http

  closeResult: string;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor(private _dataService: DataService, private route: ActivatedRoute,
      private commonService: HotelService, http: Http, private el: ElementRef) {

  }

  public uploader: FileUploader = new FileUploader({
      url: URL,
      itemAlias: 'photo',
      removeAfterUpload: true,
      allowedMimeType: ['image/jpeg', 'image/png']
  });

  getHotelInfo() {
      this._dataService.gethotelInfo(this.route.snapshot.params['id'])
          .subscribe(res => {
              this.hotelInfo = res;
              var i = 0;
              while (i < this.hotelInfo.photos.length) {
                  if (this.hotelInfo.photos[i].indexOf("assets") > -1) {
                      this.hotelInfo.photos[i] = this.hotelInfo.photos[i];
                  }
                  i += 1;
              }
              this.commonService.hotelInfo = this.hotelInfo;
              this.commonService.hotelStars = Array(this.hotelInfo.stars).fill(0);
          });
  }

  ngOnInit() {
      //override the onAfter Adding file property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file) => {
          file.withCredentials = false;
      };
      //overide the onCompleteItem property of the uploader so we are
      //able to deal with the server response.
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          response = response.replace("src/", "")
          this.hotelInfo.photos.push(response);
          console.log("ImageUpload:uploaded:", this.hotelInfo, response);
      };

      this.getHotelInfo();
  }

  reloadHotelInfo() {
      this.getHotelInfo();
  }
  deleteImage(index) {
        this.hotelInfo.photos.splice(index, 1);
        this._dataService.updateHotelDetail(this.route.snapshot.params['id'], this.hotelInfo)
        .subscribe(res => {
            console.log(res);
        });
  }
  upload() {
      //locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;
      //create a new fromdata instance
      let formData = new FormData();
      let headers = new Headers({'hotelid': this.route.snapshot.params['id']});
      let options = new RequestOptions({ headers: headers });
      //check if the filecount is greater than zero, to be sure a file was selected.
      if (fileCount > 0) { // a file was selected
          //append the key name 'photo' with the first file in the element
          formData.append('photo', inputEl.files.item(0));
          //call the angular http method
          this.http
              //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
              .post(URL, formData, options).map((res: Response) => res.json()).subscribe(
                  //map the success function and alert the response
                  (success) => {
                      alert(success._body);
                  },
                  (error) => alert(error))
      }
  }

}