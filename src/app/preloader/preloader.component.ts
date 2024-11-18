import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'] // Note: Corrected `styleUrl` to `styleUrls`
})
export class PreloaderComponent {
 
}
