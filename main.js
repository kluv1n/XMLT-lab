async function initApp() {
  try {
      const appContainer = document.getElementById('app');
      if (!appContainer) throw new Error('App container not found');
      
      const path = window.location.pathname;
      
      if (path.startsWith('/api/')) {
          // Обработка API запросов
          return;
      } else if (path.startsWith('/stocks/')) {
          const id = parseInt(path.split('/')[2]);
          const { KinopoiskContent } = await import('/pages/kp-film-page/index.js');
          new KinopoiskContent(appContainer, id).render();
      } else {
          const { MainPage } = await import('/pages/kp-main-page/index.js');
          new MainPage(appContainer).render();
      }
  } catch (error) {
      console.error('Initialization error:', error);
      document.getElementById('app').innerHTML = `
          <div class="alert alert-danger m-3">
              <h4>Application Error</h4>
              <p>${error.message}</p>
              <button onclick="window.location.reload()" class="btn btn-primary mt-2">
                  Reload
              </button>
          </div>`;
  }
}

// Запуск приложения
if (document.readyState === 'complete') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}