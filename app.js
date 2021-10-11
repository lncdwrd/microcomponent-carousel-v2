class ImageCarousel {
  constructor(selector) {
    this.selector = selector;

    this.currentImageIndex = 0;

    this.previousState = null;
    this.activeState = null;
    this.nextState = null;
    
    this.timer = null;
  }

  // Public
  initialize(previousState, activeState, nextState) {
    this.previousState = previousState;
    this.activeState = activeState;
    this.nextState = nextState;

    this._renderImage();

    return this;
  }

  slider() {
    this.timer = setInterval(() => {
      this._getNextImage();
    }, 3000);

    return this;
  }

  renderNextImage() {
    this._getNextImage();

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.slider();
    }

    return this;
  }

  renderPreviousImage() {
    this._getPreviousImage();

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.slider();
    }

    return this;
  }


  
  // Private
  _getImages() {
    const imageArr = Array.from(document.querySelectorAll(this.selector));

    return imageArr;
  }

  _renderImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;
    const previousImageIndex = (this.currentImageIndex === 0) ? imageArrLength : this.currentImageIndex - 1;
    const nextImageIndex = (this.currentImageIndex === imageArrLength) ? 0 : this.currentImageIndex + 1;

    imageArr[previousImageIndex].classList.add(this.previousState);
    imageArr[this.currentImageIndex].classList.add(this.activeState);
    imageArr[nextImageIndex].classList.add(this.nextState);
  }

  _getPreviousImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;

    this._hidePreviousImage();

    if (this.currentImageIndex === 0) {
      this.currentImageIndex = imageArrLength;
    } else {
      this.currentImageIndex--;
    }

    this._renderImage();
  }

  _getNextImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;

    this._hidePreviousImage();
    
    if (this.currentImageIndex < imageArrLength) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }

    this._renderImage();
  }

  _hidePreviousImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;
    const previousImageIndex = (this.currentImageIndex === 0) ? imageArrLength : this.currentImageIndex - 1;
    const nextImageIndex = (this.currentImageIndex === imageArrLength) ? 0 : this.currentImageIndex + 1;

    imageArr[previousImageIndex].classList.remove(this.previousState);
    imageArr[this.currentImageIndex].classList.remove(this.activeState);
    imageArr[nextImageIndex].classList.remove(this.nextState);
  }
}

// Initialize Carousel
const carousel = new ImageCarousel('.carousel-item');

carousel.initialize('carousel-item--prev', 'carousel-item--active', 'carousel-item--next');



// Events
const prevBtn = document.querySelector('.js-prev-btn');
const nextBtn = document.querySelector('.js-next-btn');

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  carousel.renderPreviousImage();
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  carousel.renderNextImage();
});