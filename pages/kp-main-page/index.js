import { HomeButtonComponent } from '../../components/kp-home-button/index.js';
import { AddCardButtonComponent } from '../../components/kp-add-button/index.js';
import { TemplatesCardComponent } from '../../components/kp-film-card/index.js';
import { KinopoiskContent } from '../kp-film-page/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
    }

    getData() {
        return [
            {
                id: 1,
                title: 'Комедии',
                elements: [{
                    title: "Комедии",
                    description: "Смешные и легкие фильмы для поднятия настроения",
                    src: "https://img.freepik.com/free-photo/person-s-hand-holding-ticket-cinema-home-couple_23-2147891726.jpg"
                }]
            },
            {
                id: 2,
                title: 'Драмы',
                elements: [{
                    title: "Драмы",
                    description: "Глубокие и эмоциональные фильмы о жизни",
                    src: "https://img.freepik.com/free-photo/theater-mask-red-curtain_23-2150062679.jpg"
                }]
            },
            {
                id: 3,
                title: 'Фантастика',
                elements: [{
                    title: "Фантастика",
                    description: "Футуристические миры и технологии будущего",
                    src: "https://img.freepik.com/free-photo/digital-art-moon-buildings-wallpaper_23-2150918703.jpg"
                }]
            },
            {
                id: 4,
                title: 'Боевики',
                elements: [{
                    title: "Боевики",
                    description: "Экшн и адреналин в каждом кадре",
                    src: "https://img.freepik.com/free-photo/front-view-soldier-wearing-camouflage-equipment_23-2151001978.jpg"
                }]
            }
        ];
    }

    getHTML() {
        return `
        <div id="main-page" style="background-color:#141414;">
            <div class="header d-flex align-items-center p-3" style="border-bottom:1px solid #333;">
                <div id="home-button-container"></div>
                <div class="search-container flex-grow-1 mx-3">
                    <input type="text" id="genre-search" placeholder="Поиск по жанру..." 
                           class="form-control" style="background-color:#1a1a1a;color:white;border-color:#FF6C37;">
                </div>
            </div>
            <div class="cards-container d-flex flex-wrap gap-3 p-3"></div>
        </div>`;
    }

    clickCard(cardId) {
        const apiTemplatesPage = new KinopoiskContent(this.parent, cardId);
        apiTemplatesPage.render();
    }

    handleAddCard() {
        const newCard = {
            id: this.data.length + 1,
            title: 'Новый жанр',
            elements: [{
                title: "Новый жанр",
                description: "Описание нового жанра",
                src: "https://img.freepik.com/free-photo/3d-glasses-popcorn-arrangement_23-2149558794.jpg"
            }]
        };
        this.data.push(newCard);
        this.renderCards();
    }

    handleRemoveCard(cardId) {
        this.data = this.data.filter(item => item.id !== cardId);
        this.renderCards();
    }

    renderCards() {
        const container = document.querySelector('.cards-container');
        container.innerHTML = '';
        
        this.data.forEach(item => {
            const cardHTML = `
            <div class="templates-card" data-id="${item.id}" style="width: 250px;">
                <div class="card-body-custom">
                    <h5 class="card-title-custom text-center mb-2" style="font-size:1.1rem">${item.title}</h5>
                    <div class="card-image-container mb-2">
                        <img src="${item.elements[0].src}" alt="${item.elements[0].title}" 
                             class="img-fluid rounded" style="height: 150px; width: 100%; object-fit: cover;">
                    </div>
                    <p class="card-text-custom text-center" style="font-size:0.9rem">${item.elements[0].description}</p>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <button class="btn btn-sm btn-outline-danger" data-id="${item.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" data-id="${item.id}" 
                                style="background-color:#FF6C37;border-color:#FF6C37;">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
            </div>`;
            
            container.insertAdjacentHTML('beforeend', cardHTML);
            
            document.querySelector(`button.btn-primary[data-id="${item.id}"]`)
                .addEventListener('click', () => this.clickCard(item.id));
                
            document.querySelector(`button.btn-outline-danger[data-id="${item.id}"]`)
                .addEventListener('click', () => this.handleRemoveCard(item.id));
        });

        //кнопка добавления
        const addButtonHTML = `
        <div class="templates-card" style="width: 250px; height: 340px;">
            <div class="card-body-custom d-flex justify-content-center align-items-center h-100">
                <button id="add-card-button" type="button" 
                        style="color:#FF6C37; font-size:80px; border:none; background-color:transparent; width:100%; height:100%;">
                    +
                </button>
            </div>
        </div>`;
        
        container.insertAdjacentHTML('beforeend', addButtonHTML);
        document.getElementById('add-card-button').addEventListener('click', () => this.handleAddCard());
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Добавляем кнопку "Домой"
        const homeButtonContainer = document.getElementById('home-button-container');
        const homeButton = new HomeButtonComponent(homeButtonContainer);
        homeButton.render(() => {
            this.parent.innerHTML = '';
            new MainPage(this.parent).render();
        });

        this.renderCards();

        document.getElementById('genre-search').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.templates-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title-custom')?.textContent.toLowerCase();
                if (title) {
                    card.style.display = title.includes(searchTerm) ? 'block' : 'none';
                }
            });
        });
    }
}