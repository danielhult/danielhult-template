import { LoadManager } from './classes/LoadManager';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';

class App {
  constructor() {
    this._setInitialState();
    this._createPreloader();
    this._createPages();
    this._addLinkListeners();
    this._addEventListeners();
  }

  _setInitialState() {
    this.pageContent = document.querySelector('.page-content');
    this.template = this.pageContent.dataset.template;
  }

  _createPreloader() {
    this.preloader = new Preloader();
    LoadManager.setLoading();
    this.preloader.once('loaded', this.onLoadingFinished.bind(this));
  }

  onLoadingFinished() {
    LoadManager.onLoadingComplete();
    this.preloader.destroy();
  }

  _createPages() {
    this.pages = new Map();

    this.pages.set('home', new Home());
    this.pages.set('about', new About());
    this.pages.set('collections', new Collections());

    this.page = this.pages.get(this.template);
  }

  _onPopStateChange() {
    this._onRouteChange({
      url: window.location.pathname,
      push: false,
    });
  }

  _getRouteTemplates(fromRoute, nextPageHTML) {
    let dom = document.createElement('div');
    dom.innerHTML = nextPageHTML;
    let nextPageTemplate = dom
      .querySelector('.page-content')
      .getAttribute('data-template');

    return {
      fromRoute: fromRoute,
      toRoute: nextPageTemplate,
    };
  }

  _changeDOM(nextPageHTML) {
    const nextPageDiv = document.createElement('div');
    nextPageDiv.innerHTML = nextPageHTML;
    const nextPageContent = nextPageDiv.querySelector('.page-content');
    const nextPageTemplate = nextPageContent.getAttribute('data-template');

    this.pageContent.setAttribute('data-template', nextPageTemplate);
    this.pageContent.innerHTML = nextPageContent.innerHTML;
    this.template = this.pageContent.dataset.template;
    this.page = this.pages.get(this.template);
  }

  _leaveTransition(leaveCallback) {
    return new Promise(leaveCallback);
  }

  _beforeEnterTransition(beforeEnterCallback) {
    return new Promise(beforeEnterCallback);
  }

  _enterTransition(enterCallback) {
    return new Promise(enterCallback);
  }

  async _onRouteChange({ url, push = true }) {
    if (this.isLoading || this.url === url) {
      return;
    }

    const request = await window.fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const nextPageHTML = await request.text();

    if (request.status === 200) {
      LoadManager.setLoading();

      if (push) {
        window.history.pushState({}, document.title, url);
      }

      const { fromRoute, toRoute } = this._getRouteTemplates(
        this.template,
        nextPageHTML
      );

      console.log('Going from "' + fromRoute + '" to "' + toRoute + '"');

      await this._leaveTransition((resolve) => {
        this.page.onLeave(resolve, toRoute);
      });

      this._changeDOM(nextPageHTML);

      await this._beforeEnterTransition((resolve) => {
        this.page.onBeforeEnter(resolve, fromRoute);
      });

      await this._enterTransition((resolve) => {
        this.page.onEnter(resolve, fromRoute);
      });

      this._addEventListeners();
      LoadManager.onLoadingComplete();
    }
  }

  _addLinkListeners() {
    const links = [...document.querySelectorAll('a')];

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;

        this._onRouteChange({ url: href });
      };
    });
  }

  _addEventListeners() {
    window.addEventListener('popstate', this._onPopStateChange, {
      passive: true,
    });
  }
}
new App();
