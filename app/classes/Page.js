import TextReveal from '../animations/TextReveal';
import gsap from 'gsap';

export default class Page {
  constructor() {
    this._setInitialState();
    this._createAnimations();
  }

  _setInitialState() {
    this.titles = [...document.querySelectorAll('[data-animation="title"')];
    this.paragraphs = [
      ...document.querySelectorAll('[data-animation="paragraph"'),
    ];
  }

  _createAnimations() {
    this.animationTitles = this.titles.forEach(
      (title) => new TextReveal({ element: title })
    );
  }

  onLeave(resolve) {
    gsap.to(document.documentElement, {
      autoAlpha: 0,
      duration: 0.5,
      onComplete: resolve,
    });
  }

  onEnter(resolve) {
    gsap.to(document.documentElement, {
      autoAlpha: 1,
      duration: 0.5,
      onComplete: resolve,
    });
  }
}
