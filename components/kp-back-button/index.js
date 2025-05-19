export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(listener) {
        document.getElementById('back-button').addEventListener('click', listener)
    }

    getHTML() {
        return `
    <button id="back-button" class="btn-custom btn-primary" style="background-color:#FF6C37; color:#ffffff;">
        Назад
    </button>`
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}