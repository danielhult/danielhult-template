class LoadingManager {
  setLoading() {
    window.isAppLoading = true;
    document.documentElement.classList.add('is-loading');
  }

  onLoadingComplete() {
    window.isAppLoading = false;
    document.documentElement.classList.remove('is-loading');
  }
}

export const LoadManager = new LoadingManager();
