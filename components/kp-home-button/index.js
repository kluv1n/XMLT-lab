export class HomeButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
        <button id="home-button" class="btn-custom" 
                style="background-color:#FF6C37; color:#ffffff; border:none;">
            <i class="bi bi-house-door-fill"></i>
        </button>`
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        document.getElementById('home-button').addEventListener('click', listener)
    }
}