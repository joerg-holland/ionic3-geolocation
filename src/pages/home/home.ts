import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public coords: any;
  public timestamp: any;

  constructor(
    private _geolocation: Geolocation,
    public navCtrl: NavController
  ) {
    this._geolocation.getCurrentPosition().then(
      (result: any) => {
        console.log(result);
        this.coords = result.coords;
        this.timestamp = result.timestamp;
      }).catch((error) => {
        console.log('Error getting location', error);
      }
    );
  }

  public startWatching(): any {
    let watch = this._geolocation.watchPosition();
    watch.subscribe(
      (result: any) => {
        console.log(result);
        this.coords = result.coords;
        this.timestamp = result.timestamp;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
