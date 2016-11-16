import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

declare var plugin:any;
declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private map:GoogleMap;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady():void {
    GoogleMap.isAvailable().then(() => {
      this.map = new GoogleMap('map-canvas');
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.onMapReady();
      });
    });
  }

  private onMapReady():void {
    if ((<any>window).plugin && plugin.google && plugin.google.maps) {
      this.map.clear();
      this.map.setIndoorEnabled(false);
      this.map.setTrafficEnabled(false);
      this.map.setDebuggable(true);
      this.map.setMapTypeId(plugin.google.maps.MapTypeId.SATELLITE);
      this.map.setOptions({
        controls: {
          compass: false,
          myLocationButton: false,
          indoorPicker: false,
          zoom: false
        },
        gestures: {
          scroll: true,
          tilt: false,
          rotate: true,
          zoom: true
        },
        camera: {
          latLng: new GoogleMapsLatLng(59.452624, -85.846621),
          zoom: 17
        }
      });
    }
  }

  refreshMap(){
    this.map.refreshLayout();
    console.log("refresh");
  }

  changeLevel(levelName){
    console.log("changeLevel: " + levelName);
  }

  getMyLocation(){
    console.log("getMyLocation");
  }
}
