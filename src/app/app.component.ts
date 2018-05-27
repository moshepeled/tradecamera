import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // toggle webcam on/off
  public showWebcam = true;

  // latest snapshot
  public webcamImage: WebcamImage = null;
  public webcamImage2: WebcamImage = null;
  public currentimage = 0;
  public maximages = 4;
  public imgs = [
    '../assets/car1.png',
    '../assets/car2.png',
    '../assets/car3.png',
    '../assets/car4.png'
  ];
  public img = '';
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public triggerSnapshot(): void {
    this.currentimage = this.currentimage % this.maximages + 1;
    console.log(this.currentimage);
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    console.log('current image: ' + this.currentimage);
    this.img = this.imgs[this.currentimage - 1];
    if (this.currentimage === 1) {
      this.webcamImage = webcamImage;
    } else {
      this.webcamImage2 = webcamImage;
    }
  }

  constructor() {
    this.img = this.imgs[0];
    this.currentimage = 1;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
