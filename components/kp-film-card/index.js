import { ButtonGroupComponent } from '../kp-button-group/index.js';
import { CaruselComponent } from '../kp-carousel/index.js';

export class TemplatesCardComponent {
    constructor(parent) {
        this.parent = parent;
        this.buttonGroup = new ButtonGroupComponent(parent);
        this.carousel = new CaruselComponent(parent);
    }

    getHTML(data, isDetailed = false) {
        if (isDetailed) {
            return `
                <div class="film-detail-view">
                    <h2 class="mb-4" style="color: #FF6C37;">${data.title}</h2>
                    ${this.carousel.getHTML(data)}
                    <div class="mt-4">
                        ${data.elements.map(el => `
                            <div class="mb-4 p-3" style="background: #1a1a1a; border-radius: 8px;">
                                <h4>${el.title}</h4>
                                <p class="mb-0">${el.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        return `
            <div class="templates-card" data-id="${data.id}" 
                 style="background: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
                <div class="card-body-custom p-0">
                    <h5 class="card-title-custom p-3" style="border-bottom: 1px solid #333; margin: 0;">
                        ${data.title}
                    </h5>
                    ${this.carousel.getHTML(data)}
                    <div class="p-3">
                        ${this.buttonGroup.getHTML(data)}
                    </div>
                </div>
            </div>`;
    }

    render(data, viewListener, removeListener, isDetailed = false) {
        const html = this.getHTML(data, isDetailed);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        if (!isDetailed) {
            this.buttonGroup.addListeners(data, viewListener, removeListener);
        }
    }
}