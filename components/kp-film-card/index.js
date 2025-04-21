import { ButtonGroupComponent } from '../kp-button-group/index.js'
import { CaruselComponent } from '../kp-carousel/index.js'

export class TemplatesCardComponent {
    constructor(parent) {
        this.parent = parent
        this.buttonGroup = new ButtonGroupComponent(parent)
        this.carousel = new CaruselComponent(parent)
    }

    getHTML(data) {
        return `
    <div class="templates-card" data-id="${data.id}">
        <div class="card-body-custom">
            <h5 class="card-title-custom">${data.title}</h5>
            
            ${this.carousel.getHTML(data)}
            <div class="button-group-container">
                ${this.buttonGroup.getHTML(data)}
            </div>
        </div>
    </div>`
    }

    render(data, analyzeListener, removeListener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.buttonGroup.addListeners(data, analyzeListener, removeListener)
    }
}