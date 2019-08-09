/**
 * yall - yet another lazyload library using intersection observer
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

//lazyload
class yall {
  constructor(config = {}) {
    //elems to search
    this.target = config.target || "yall_lazy";
    //class to add after being loaded
    this.classToLoad = config.classToLoad || "yall_loaded";
    //threshold
    this.threshold = config.threshold || 0;
    //root
    this.root = document.querySelector(config.root);
    //rootMargin
    this.rootMargin = config.rootMargin || "0px 0px 100px 0px";
    //callback
    this.callback = config.callback || null;
    //activate for loading="lazy" attribute https://caniuse.com/#feat=loading-lazy-attr
    this.useLoading = config.useLoading || false;
    //options for intersection
    this.options = { threshold: this.threshold, root: this.root, rootMargin: this.rootMargin };
    //if not supported in older browsers - okay not that old - load all by default
    if (
      !("IntersectionObserver" in window) ||
      !("IntersectionObserverEntry" in window) ||
      !("intersectionRatio" in window.IntersectionObserverEntry.prototype) ||
      !("isIntersecting" in window.IntersectionObserverEntry.prototype) ||
      //browser supports loading (and lets assume you are using the attribute loading="lazy")
      (!("loading" in HTMLImageElement.prototype) && this.useLoading)
    ) {
      this.fsafari = true;
      // load all images
      Array.from(document.querySelectorAll("." + this.target + ":not(" + "." + this.classToLoad + ")")).forEach(element => {
        this.loadElem(element);
      });
    }
  }

  /** @param elem loads element **/
  loadElem(elem) {
    const src = elem.dataset.src;
    const srcset = elem.dataset.srcset;
    !src ? null : (elem.src = src);
    !srcset ? null : (elem.srcset = srcset);
    elem.classList.add(this.classToLoad);
    if (this.callback) {
      window[this.callback](elem);
    }
  }

  /** run observer */
  run() {
    if(this.safari) { return; }
    const yallObserver = new IntersectionObserver((entries, yallObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          this.loadElem(entry.target);
          yallObserver.unobserve(entry.target);
        }
      });
    }, this.options);
    Array.from(document.querySelectorAll("." + this.target + ":not(" + "." + this.classToLoad + ")")).forEach(element => {
      yallObserver.observe(element);
    });
  }
}
