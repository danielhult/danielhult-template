import TextReveal from '../animations/TextReveal';
import gsap from 'gsap';
import each from 'lodash/each';

export default class Page {
  constructor() {
    this._setInitialState();
    this._createAnimations();
  }

  _setupSelectors() {
    this.element =
      this.selector instanceof window.HTMLElement
        ? this.selector
        : document.querySelector(this.selector);
    this.elements = {};

    each(this.selectors, (selector, key) => {
      if (
        selector instanceof window.HTMLElement ||
        selector instanceof window.NodeList
      ) {
        this.elements[key] = selector;
      } else if (Array.isArray(selector)) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = this.element.querySelectorAll(selector);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(selector);
        }
      }
    });
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
    gsap.to('.page-content', {
      autoAlpha: 0,
      duration: 0.5,
      onComplete: resolve,
    });
  }

  onEnter(resolve) {
    gsap.to('.page-content', {
      autoAlpha: 1,
      duration: 0.5,
      onComplete: resolve,
    });
  }
}
