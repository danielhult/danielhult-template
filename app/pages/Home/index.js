import Page from '../../classes/Page';
import gsap from 'gsap';
import { smoothOriginChange } from '../../utils/smoothOriginChange';

export default class Home extends Page {
  constructor() {
    super({
      element: 'h1',
    });

    this.clickedImage = null;
    this._addImageListeners();
  }

  _addImageListeners() {
    this.images = [...document.querySelectorAll('.image-grid img')];

    this.images.forEach((image, index) => {
      image.addEventListener('click', this._positionImages.bind(this));
    })
  }

  _positionImages(event) {
    this.clickedImage = event.target;
    this.imagePositions = this.images.map(image => image.getBoundingClientRect());

    this.clickedImage.style.zIndex = '10';
    gsap.set(this.clickedImage, { scale: 0.2});

    const tl = gsap.timeline();


    this.images.forEach((image, index) => {
      tl.to(image, {
        x: (window.innerWidth / 2) - (this.imagePositions[index].left + (this.imagePositions[index].width / 2)),
        y: (window.innerHeight / 2)  - (this.imagePositions[index].top + (this.imagePositions[index].height / 2)),
        duration: 2,
        ease: 'expo.inOut',
      }, 0.1 * index)
    });


    
    tl
    .call(() => smoothOriginChange(this.clickedImage, 'center center'))
    .to(this.clickedImage, {
     scale: 1,
     ease: 'expo.inOut',
     duration: 1.5
    })
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
