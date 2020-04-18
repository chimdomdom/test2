document.addEventListener("DOMContentLoaded", function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector(".header");
    this.sides = document.querySelectorAll(".side");
    this._observers = [];
    this._init();
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider(".swiper-container");
    Pace.on("done", this._paceDone.bind(this));
  }

  _paceDone() {
    this._scrollInit();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _navinviewAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  _sideinviewAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side =>  side.classList.add("inview"));
    } else {
      this.sides.forEach(side => side.classList.remove("inview"));
    }
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }

  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }
  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _scrollInit() {
    this.observers = new ScrollObserver(".nav-trigger", this._navinviewAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation);
    this.observers = new ScrollObserver(".appear", this._inviewAnimation);
    this.observers = new ScrollObserver(".tween-animate-title", this._textAnimation,{ rootMargin: "-200px 0px"});
    this.observers = new ScrollObserver(".swiper-container", this._toggleSlideAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver("#main-content", this._sideinviewAnimation.bind(this), { once: false , rootMargin: "-400px 0px"});
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   const hero = new HeroSlider(".swiper-container");
//   hero.start();

//   const cb = function (el, inview) {
//     if (inview) {
//       const ta = new TweenTextAnimation(el);
//       ta.animate();
//     }
//   };

//   const so = new ScrollObserver(".tween-animate-title", cb);

// const _inviewAnimation = function (el, inview) {
//     if(inview) {
//         el.classList.add('inview');
//     }else{
//         el.classList.remove('inview');
//     }
// }

// const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);

// const header = document.querySelector(".header")
// const _navinviewAnimation = function (el, inview) {
//     if(inview) {
//         header.classList.remove('triggered');
//     }else{
//         header.classList.add('triggered');
//     }
// }

// const so3 = new ScrollObserver('.nav-trigger', _navinviewAnimation,{once: false});

//     new Main();
//   });
