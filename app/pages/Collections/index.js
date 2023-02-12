import Page from '../../classes/Page';
import gsap from 'gsap';

export default class Collection extends Page {
  constructor() {
    super();
  }

  onEnter(resolve, fromRoute) {
    if (fromRoute === 'home') {
      gsap.fromTo(
        '.image-grid__title',
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power4.out',
          duration: 1,
          onComplete: resolve,
        }
      );
    } else {
      gsap.to('.page-content', {
        autoAlpha: 1,
        onComplete: resolve,
      });
    }
  }

  onLeave(resolve, toRoute) {
    if (toRoute === 'home') {
      gsap.to('.image-grid__title', {
        autoAlpha: 0,
        y: 40,
      });
      gsap.to('.image-grid img', {
        scale: 0.5,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: resolve,
      });
    } else {
      gsap.to('.page-content', {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: resolve,
      });
    }
  }
}
