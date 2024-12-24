import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapService } from '../shared/services/gsap.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly hostRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly gsapService: GsapService = inject(GsapService);

  ngOnInit(): void {
    this.gsapService.run(() => this.initBobrAnimations());
    this.gsapService.run(() => this.initZebraAnimations());
  }

  private initBobrAnimations(): void {
    const bobr = this.hostRef.nativeElement.querySelector('.bobr');
    const innerBobr = this.hostRef.nativeElement.querySelector('.inner-bobr');
    const video = this.hostRef.nativeElement.querySelector<HTMLVideoElement>('#chika-video');

    if (!video || !bobr || !innerBobr)
      throw new Error('initAnimations function failed to find the necessary elements');

    video.addEventListener('loadedmetadata', () => {
      const totalFrames = 50;
      const frameDuration = video.duration / totalFrames;

      ScrollTrigger.create({
        trigger: bobr,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: innerBobr,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          const currentFrame = Math.floor(scrollProgress * totalFrames);
          video.currentTime = currentFrame * frameDuration;
        },
      });
    });

    gsap.to(this.hostRef.nativeElement.querySelector('#mts'), {
      scrollTrigger: {
        trigger: bobr,
        start: 'top top',
        end: 'center center',
        scrub: 0.5,
      },
      opacity: 1,
      y: '0',
      x: '0'
    });

    gsap.to(this.hostRef.nativeElement.querySelector('#hueta'), {
      scrollTrigger: {
        trigger: bobr,
        start: 'center center',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      delay: 1,
      opacity: 1,
      y: '0',
      x: '0'
    });
  }

  private initZebraAnimations(): void {
    gsap.to(this.hostRef.nativeElement.querySelector('.zebra__img-wrapper'), {
      scrollTrigger: {
        trigger: this.hostRef.nativeElement.querySelector('.zebra'),
        pin: this.hostRef.nativeElement.querySelector('.zebra__inner'),
        scrub: 0.5,
        start: 'top top',
        end: 'center center',
      },
      ease: 'none',
      width: 0,
      height: 0,
    });

    gsap.to(this.hostRef.nativeElement.querySelector('.zebra__message'), {
      scrollTrigger: {
        trigger: this.hostRef.nativeElement.querySelector('.zebra'),
        pin: this.hostRef.nativeElement.querySelector('.zebra__inner'),
        scrub: 0.5,
        start: 'center center',
        end: 'bottom bottom',
      },
      ease: 'none',
      scale: 1,
    });
  }
}
