import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private STORAGE_KEY_REDIRECT_URL = "RedirectUrl";

  constructor(
    private router: Router
  ) { }

  setRedirectUrl(url: string) {
    StorageService.set(this.STORAGE_KEY_REDIRECT_URL, url);
  }

  getRedirectUrl() {
    return StorageService.get(this.STORAGE_KEY_REDIRECT_URL);
  }

  deleteRedirectUrl() {
    StorageService.set(this.STORAGE_KEY_REDIRECT_URL, "");
    StorageService.delete(this.STORAGE_KEY_REDIRECT_URL);
  }
  performRedirectIfAny() {
    try {
      const redirectUrl = this.getRedirectUrl();
      if (redirectUrl) {
        this.deleteRedirectUrl();
        this.router.navigateByUrl(redirectUrl);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
