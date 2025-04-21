export class CaruselComponent {
  constructor(parent) {
      this.parent = parent
  }
  
  getHTML(data) {
    return `
<div class="carousel-container">
    <div id="carousel-${data.id}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
        <div class="carousel-inner">
            ${data.elements.map((elem, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <div class="carousel-image-container">
                        <img src="${elem.src}" alt="${elem.title}">
                    </div>
                    <div class="carousel-text-container">
                        <h3>${elem.title}</h3>
                        <p>${elem.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <!-- Индикаторы теперь после основного контента -->
        <div class="carousel-indicators-container">
            <div class="carousel-indicators">
                ${data.elements.map((_, index) => `
                    <button type="button" 
                            data-bs-target="#carousel-${data.id}" 
                            data-bs-slide-to="${index}"
                            class="${index === 0 ? 'active' : ''}"
                            aria-label="Slide ${index + 1}">
                    </button>
                `).join('')}
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>`
  }

  render(data) {
      const html = this.getHTML(data)
      this.parent.insertAdjacentHTML('beforeend', html)
  }
}