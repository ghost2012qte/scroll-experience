import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly platform = inject(PLATFORM_ID);

  run(animationFn: () => void): void {
    if (isPlatformServer(this.platform)) {
      console.warn('GSAP animation skipped: not running in the browser environment.');
      return;
    }
    animationFn();
  }

}
