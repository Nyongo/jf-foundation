import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes' // Ensure this file contains your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Provides HttpClient globally
    provideRouter(routes), // ✅ Provides Router & ActivatedRoute
  ],
}).catch((err) => console.error(err))
