import gsap from 'gsap';

export default class PageTransitions {
  onLeave(resolve) {
    gsap.to('.page-content', {
      autoAlpha: 0,
      duration: 0.5,
      onComplete: resolve,
    });
  }

  onBeforeEnter(resolve) {
    resolve();
  }

  onEnter(resolve) {
    gsap.to('.page-content', {
      autoAlpha: 1,
      duration: 0.5,
      onComplete: resolve,
    });
  }
}
