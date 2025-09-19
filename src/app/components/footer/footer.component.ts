import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, TranslateModule],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  isMobileDevice(): boolean {
    if (typeof navigator === 'undefined') {
      return false; // Default to desktop during SSR/prerendering
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  getWhatsAppUrl(): string {
    const phoneNumber = '254110701174';
    const message =
      'Hello! I would like to get in touch with Jackfruit Network.';

    if (this.isMobileDevice()) {
      // For mobile devices, use WhatsApp app
      return `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    } else {
      // For desktop, use web WhatsApp
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }
  }
}
