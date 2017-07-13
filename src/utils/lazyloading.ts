class LazyLoading {
    items: HTMLAnchorElement[]
    img: HTMLImageElement

    constructor(items: HTMLAnchorElement[]) {
        this.items = items
        this.img = new Image()
    }

    scroller() {
        let timer = setTimeout(() => {
            timer = null
            requestAnimationFrame(() => this.elementInViewport)
        }, 300)
    }

    loadFullImage(item : HTMLAnchorElement) {
        if (item.dataset) {
            this.img.srcset = item.dataset.srcset || ''
            this.img.sizes = item.dataset.sizes || ''
        }
        this.img.src = item.href
        this.img.className = 'reveal'
        if (this.img.complete) this.addImg(item)
        else this.img.onload = () => this.addImg
    }

    addImg(item : HTMLAnchorElement) {
        item.addEventListener('click', (e: Event) => {
            e.preventDefault()
        }, false)

        item.appendChild(this.img).addEventListener('animationend', e => {
            const pImg  = item.querySelector && item.querySelector('img.preview')
            if (pImg) {
                let el = (e.target as any) as HTMLImageElement
                el.alt = (pImg as HTMLImageElement).alt || ''
                item.removeChild(pImg)
                el.classList.remove('reveal')
            }
        })
    }

    elementInViewport(el: HTMLElement): boolean {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent as HTMLElement;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    }
}

window.onload = () => {
    var lazyLoading = new LazyLoading(document.querySelector("a"))
    window.addEventListener('scroll', lazyLoading.scroller, false)
    window.addEventListener('resize', lazyLoading.scroller, false)
}