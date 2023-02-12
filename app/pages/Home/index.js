import Page from '../../classes/Page';
import gsap from 'gsap';

export default class Home extends Page {
  constructor() {
    super({
      element: 'h1',
    });
  }

  onLeave(resolve, template) {
    console.log(template);
    gsap.fromTo(
      '.image-grid img',
      {
        scale: 0.5,
      },
      {
        scale: 1,
        duration: 2,
        ease: 'expo.inOut',
        onComplete: resolve,
      }
    );
  }

  onEnter(resolve, template) {
    console.log(template);
    gsap.to(document.documentElement, {
      onComplete: resolve,
      autoAlpha: 1,
      duration: 2,
      ease: 'expo.out',
    });
  }
}
