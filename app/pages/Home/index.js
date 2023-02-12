import Page from '../../classes/Page';
import gsap from 'gsap';

export default class Home extends Page {
  constructor() {
    super({
      element: 'h1',
    });
  }

  onLeave(resolve, toRoute) {
    if (toRoute === 'collections') {
      gsap.fromTo(
        '.image-grid img',
        {
          scale: 0.5,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: 'expo.inOut',
          onComplete: resolve,
        }
      );
    } else {
      gsap.to('.page-content', {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: resolve,
      });
    }
  }

  onEnter(resolve, fromRoute) {
    if (fromRoute === 'collections') {
      resolve();
    } else {
      gsap.to('.page-content', {
        onComplete: resolve,
        autoAlpha: 1,
        duration: 2,
        ease: 'expo.out',
      });
    }
  }
}
