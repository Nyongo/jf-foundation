import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// ngx-translate (standalone API)
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    // configure TranslateService for standalone apps
    provideTranslateService({
      // set initial/fallback language as needed
      defaultLanguage: 'en',
      fallbackLang: 'en',
      // `useDefaultLang` is optional if you want automatic use()
      useDefaultLang: true,
    }),

    // configure the HTTP loader (point to your JSON assets)
    provideTranslateHttpLoader({
      prefix: 'assets/i18n/',
      suffix: '.json',
      // you can also set enforceLoading/useHttpBackend if needed
    }),
  ],
};