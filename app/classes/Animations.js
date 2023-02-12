import Component from './Component';

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    this._createObserver();
  }

  _createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onEnter();
        } else {
          this.onLeave();
        }
      });
    });

    this.observer.observe(this.element);
  }

  onEnter() {}

  onLeave() {}
}
