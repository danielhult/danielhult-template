import Page from '../../classes/Page';
import gsap from 'gsap';
import { split } from '../../utils/textSplit';

export default class About extends Page {
  constructor() {
    super();
  }

  onBeforeEnter(resolve, fromRoute) {
    this.text = document.querySelector('.text p');
    split({
      element: this.text,
    });

    this.splitted = document.querySelectorAll('.text span');
    gsap.set(this.splitted, { autoAlpha: 0, y: 64 });
    gsap.set('.page-content', { autoAlpha: 1, onComplete: resolve });
  }

  onEnter(resolve, fromRoute) {
    gsap.to(this.splitted, {
      autoAlpha: 1,
      y: 0,
      delay: 0.3,
      ease: 'expo.out',
      duration: 2,
      stagger: 0.006,
      onComplete: resolve,
    });
  }
}
