import { BackButtonComponent } from '../../components/kp-back-button/index.js';
import { TemplatesCardComponent } from '../../components/kp-film-card/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class KinopoiskContent {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        if (isNaN(this.id)) {
            console.error('Некорректный ID карточки:', id);
            this.id = 0;
        }
        this.pageRoot = null;
    }

    render() {
        this.parent.innerHTML = `
        <div id="film-page" style="background-color:#141414; min-height:100vh;">
            <div class="header p-3" style="border-bottom:1px solid #333;">
                <div id="back-button-container"></div>
            </div>
            <div id="loading-spinner" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div id="film-content" class="p-4"></div>
        </div>`;

        this.renderBackButton();
        this.pageRoot = document.getElementById('film-content');
        this.getData();
    }

    renderBackButton() {
        const backButton = new BackButtonComponent(
            document.getElementById('back-button-container')
        );
        backButton.render(this.clickBack.bind(this));
    }

    getData() {
        if (!this.id) {
            this.showError('Некорректный ID карточки');
            return;
        }

        document.getElementById('loading-spinner').style.display = 'block';
        
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            document.getElementById('loading-spinner').style.display = 'none';
            
            if (status === 200 && data) {
                this.renderData(data);
            } else if (status === 404) {
                this.showError('Карточка не найдена');
            } else {
                this.showError('Ошибка загрузки данных');
                console.error('Ошибка запроса:', status, data);
            }
        });
    }

    renderData(item) {
        if (!this.pageRoot) return;

        this.pageRoot.innerHTML = '';
        
        try {
            const card = new TemplatesCardComponent(this.pageRoot);
            card.render(item, null, null, true);
        } catch (error) {
            console.error('Ошибка рендеринга:', error);
            this.showError('Ошибка отображения карточки');
        }
    }

    clickBack() {
        window.history.back();
    }

    showError(message) {
        if (!this.pageRoot) return;

        this.pageRoot.innerHTML = `
        <div class="alert alert-danger">
            <h4>${message}</h4>
            <button id="retry-btn" class="btn btn-warning mt-2">Повторить попытку</button>
            <button onclick="window.history.back()" class="btn btn-secondary mt-2 ms-2">Назад</button>
        </div>`;
        
        document.getElementById('retry-btn')?.addEventListener('click', () => {
            this.getData();
        });
    }
}