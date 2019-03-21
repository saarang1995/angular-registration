import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  private geocoder;
  constructor() { }

  codeAddresses(address: string) {
    this.geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });

        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }
}
