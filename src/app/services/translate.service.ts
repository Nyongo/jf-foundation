import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppTranslateService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'kis']);
    this.translate.setFallbackLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  get currentLang(): string {
    return this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';
  }
}