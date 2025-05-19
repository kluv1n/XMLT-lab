import { HomeButtonComponent } from '../../components/kp-home-button/index.js';
import { AddCardButtonComponent } from '../../components/kp-add-button/index.js';
import { TemplatesCardComponent } from '../../components/kp-film-card/index.js';
import { KinopoiskContent } from '../kp-film-page/index.js';
import { TasksCardsComponent } from '../../components/tasks-cards/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.cards = [];
    }

    render() {
        this.parent.innerHTML = `
        <div id="main-page" style="background-color:#141414; min-height:100vh;">
            <div class="header d-flex align-items-center p-3" style="border-bottom:1px solid #333;">
                <div id="home-button-container"></div>
                <div class="search-container flex-grow-1 mx-3">
                    <input type="text" id="genre-search" placeholder="Поиск по жанру..." 
                           class="form-control" style="background-color:#1a1a1a;color:white;border-color:#FF6C37;">
                </div>
            </div>
            <div id="loading-spinner" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="cards-container d-flex flex-wrap gap-4 p-4" style="display:none;"></div>
            <div class="tasks-divider" style="height:2px; background-color:#FF6C37; margin:20px 0;"></div>
            <div id="tasks-footer" style="padding:0 20px 40px;"></div>
        </div>`;

        this.renderHomeButton();
        this.loadData();
        this.renderTasks();
        this.setupEventListeners();
    }

    renderHomeButton() {
        const homeButton = new HomeButtonComponent(
            document.getElementById('home-button-container')
        );
        homeButton.render(() => window.location.reload());
    }

    loadData() {
        this.showLoading(true);
        ajax.get(stockUrls.getStocks(), (data, status) => {
            this.showLoading(false);
            
            if (status === 200 && data) {
                this.cards = data;
                this.renderCards(data);
            } else {
                console.error('Ошибка загрузки данных. Статус:', status);
                this.showError('Не удалось загрузить данные. Сервер вернул неожиданный ответ.');
                
                // Заглушка для демонстрации
                this.cards = [{
                    id: 1,
                    title: 'Пример жанра',
                    elements: [{
                        title: "Фильм-пример",
                        description: "Сервер недоступен. Это локальные данные.",
                        src: "https://via.placeholder.com/300x450"
                    }]
                }];
                this.renderCards(this.cards);
            }
        });
    }

    renderCards(items) {
        const container = document.querySelector('.cards-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (!items || !Array.isArray(items)) {
            console.error('Некорректные данные для отображения:', items);
            return;
        }
        
        items.forEach(item => {
            const card = new TemplatesCardComponent(container);
            card.render(
                item,
                () => this.navigateToCard(item.id),
                () => this.deleteCard(item.id)
            );
        });
        
        this.renderAddButton();
    }

    renderAddButton() {
        const container = document.querySelector('.cards-container');
        if (!container) return;
        
        const addButton = new AddCardButtonComponent(container);
        addButton.render(() => this.addCard());
    }

    showLoading(show) {
        const spinner = document.getElementById('loading-spinner');
        const container = document.querySelector('.cards-container');
        
        if (spinner) spinner.style.display = show ? 'block' : 'none';
        if (container) container.style.display = show ? 'none' : 'flex';
    }

    showError(message) {
        const container = document.querySelector('.cards-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="alert alert-danger w-100 text-center">
                ${message}
                <button class="btn btn-sm btn-warning mt-2" onclick="location.reload()">
                    Обновить страницу
                </button>
            </div>`;
    }

    navigateToCard(id) {
        if (!this.parent) return;
        new KinopoiskContent(this.parent, id).render();
    }

    addCard() {
        const newCard = {
            title: 'Новый жанр',
            elements: [{
                title: "Новый фильм",
                description: "Описание нового фильма",
                src: "https://via.placeholder.com/300x450"
            }]
        };

        ajax.post(stockUrls.createStock(), newCard, (data, status) => {
            if (status === 201) {
                this.loadData();
            } else {
                this.showError('Не удалось добавить карточку');
            }
        });
    }

    deleteCard(id) {
        if (!confirm('Вы уверены, что хотите удалить эту карточку?')) return;

        ajax.delete(stockUrls.removeStockById(id), (_, status) => {
            if (status === 204) {
                this.loadData();
            } else {
                this.showError('Не удалось удалить карточку');
            }
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('genre-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = this.cards.filter(card => 
                    card.title.toLowerCase().includes(term)
                );
                this.renderCards(filtered);
            });
        }
    }

    renderTasks() {
        const footer = document.getElementById('tasks-footer');
        if (footer) {
            new TasksCardsComponent(footer).render();
        }
    }
}