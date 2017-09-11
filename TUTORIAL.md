# Tutorial
Ionic-Geolocation Template

Last Update: 09. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. 
If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-geolocation' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-geolocation blank
  ```
2. Open the folder, which you created the step before and run the command below.
If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Install the Ionic Native plugin 'geolocation' to the file '/package.json':
  ```bash
  $ npm install @ionic-native/geolocation@3.12.1
  ```
4. Add the Cordova plugin 'cordova-plugin-geolocation' to the file '/config.xml':
  ```bash
  $ ionic cordova plugin add cordova-plugin-geolocation@2.4.3
  ```
5. Add the plugin 'bluetooth-serial' to the app's module /src/app/app.module.ts':
  ```ts
  import { Geolocation } from '@ionic-native/geolocation';
  providers: [ ... Geolocation ... ]
  ```
6. Add the following code to the component '/src/pages/home/home.ts'
  ```ts
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
  ```
7. Add the following code to the page '/src/pages/home/home.html'
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>
        Geolocation
      </ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <ion-list *ngIf="coords">
      <ion-item>
        <h2 *ngIf="timestamp">{{timestamp}}</h2>
        <p>Timestamp</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.accuracy}}</h2>
        <p>Accuracy</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.altitude}}</h2>
        <p>Altitude</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.altitudeAccuracy}}</h2>
        <p>AltitudeAccuracy</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.heading}}</h2>
        <p>Heading</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.latitude}}</h2>
        <p>Latitude</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.longitude}}</h2>
        <p>Longitude</p>
      </ion-item>
      <ion-item>
        <h2>{{coords.speed}}</h2>
        <p>Speed</p>
      </ion-item>
    </ion-list>
    <button ion-button (click)="startWatching()">Start watching</button>
  </ion-content>
  ```
8. Build the project:
  ```bash
  $ npm run build
  ```
