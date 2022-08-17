class ScreenMenu {
constructor(selector){
  this.menu = document.querySelector(selector)

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-menu]')

  if (target) {
    const event = target.dataset.menu

    this[event]()
  }
})  
}

open() {
  this.menu.classList.add('open')
}

close() {
  this.menu.classList.remove('open')
}
}

var menu = new ScreenMenu('#screen-menu')





class Slider {
    constructor(selector, settings = {}) {
        this.settings = settings
        this.slider = document.querySelector(selector)
        this.init()
        this.slides = this.slider.children.length
    }

    next() {
        if (this.current < this.slides) {
            this.current++
        }

        if (this.current == this.slides) {
            this.slider.dispatchEvent(new Event('lastSlide'))
        }

        this.translate()
    }

    prev() {
        if (this.current > 1) {
            this.current--
        }

        if (this.current == 1) {
            this.slider.dispatchEvent(new Event('firstSlide'))
        }

        this.translate()
    }

    translate(index, cb) {
        if (index) this.current = index

        this.slider.style.transform = `translateX(-${(this.current - 1) * 100}%)`

        setTimeout(() => {
            if (cb) cb()
        }, 10)
    }

    init() {
        if (this.settings.loop) {
            const cloneFirst = this.slider.firstElementChild.cloneNode(true);
            const cloneLast = this.slider.lastElementChild.cloneNode(true);

            this.slider.appendChild(cloneFirst)
            this.slider.prepend(cloneLast)

            this.translate(2)

            const changeSlides = (index) => {
                setTimeout(() => {
                    this.slider.style.transition = null
                    this.translate(index, () => {
                        this.slider.style.transition = `${this.settings.transition}ms`
                    })
                }, this.settings.transition)
            }

            this.slider.addEventListener('lastSlide', () => changeSlides(2))
            this.slider.addEventListener('firstSlide', () => changeSlides(this.slides - 1))
        } else {
            this.current = 1
        }

        if (this.settings.transition) {
            setTimeout(() => {
                this.slider.style.transition = `${this.settings.transition}ms`
            }, 0)
        }

        if (this.settings.auto) {
            setInterval(() => {
                this.next()
            }, 100000)
        }
    }

}

const slider = new Slider('#slider', {
    transition: 2000,
    loop: true,
    auto: true
})


 // назначим обработчик при нажатии на кнопку .btn-prev
 document.querySelector('.products__prev').onclick = function () {
    // перейдём к предыдущему слайду
    slider.prev();
  }
  // назначим обработчик при нажатии на кнопку .btn-next
  document.querySelector('.products__next').onclick = function () {
    // перейдём к следующему слайду
    slider.next();
  };