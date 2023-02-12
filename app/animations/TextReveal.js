import Animation from '../classes/Animations';

import { split } from '../utils/textSplit';
import gsap from 'gsap';

export default class TextReveal extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });

    split({ element: this.element });
    split({ element: this.element });

    this.titleWords = [...this.element.querySelectorAll('span span')];
  }

  onEnter() {
    gsap.fromTo(
      this.titleWords,
      {
        autoAlpha: 0,
        yPercent: 100,
      },
      {
        ease: 'power3.out',
        stagger: 0.02,
        autoAlpha: 1,
        yPercent: 0,
      }
    );
  }

  onLeave() {
    gsap.set(this.titleWords, {
      autoAlpha: 0,
      yPercent: 100,
    });
  }
}
