import Component from '../classes/Component';
import gsap from 'gsap';
import { split } from '../utils/textSplit';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader__section',
      elements: {
        line: '.preloader__line',
        title: '.preloader__text',
        progress: '.preloader__progress',
        percentNumber: '.preloader__percent',
        images: document.querySelectorAll('img[data-src]'),
      },
    });

    split({
      element: this.elements.title,
      expression: '<br>',
    });

    split({
      element: this.elements.title,
      expression: '<br>',
    });

    this.elements.splittedText = [
      ...this.elements.title.querySelectorAll('span span'),
    ];

    this.imagesLoaded = 0;

    this._createLoader();
  }

  _createLoader() {
    if (!this.elements.images.length) {
      this.elements.percentNumber.innerHTML = '100';
      return this.onLoaded();
    }

    this.elements.images.forEach((image) => {
      image.onload = () => this._onImageLoaded();
      image.src = image.getAttribute('data-src');
    });
  }

  _onImageLoaded() {
    this.imagesLoaded += 1;

    const percentage = this.imagesLoaded / this.elements.images.length;

    gsap.to(this.elements.line, {
      scaleX: percentage,
    });

    this.elements.percentNumber.innerHTML = Math.round(percentage * 100);

    if (percentage === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        this.emit('loaded');
      },
    });

    tl.to(this.elements.splittedText, {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'expo.out',
      stagger: 0.1,
      yPercent: -100,
    })
      .to(
        this.elements.progress,
        {
          autoAlpha: 0,
          duration: 1,
        },
        '-=1.5'
      )
      .to(
        this.element,
        {
          yPercent: -100,
          duration: 1,
          ease: 'power3.out',
        },
        '-=1.1'
      );
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
