export class TasksCardsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
        <div class="tasks-container">
            <!-- Карточка сравнения массивов -->
            <div class="task-card">
                <h3 class="task-title">Сравнение массивов</h3>
                <p class="task-description">Функция isEqualArrays сравнивает два массива</p>
                <div class="task-inputs">
                    <input type="text" id="array1-input" placeholder="[1,2,3]" class="task-input">
                    <input type="text" id="array2-input" placeholder="[1,2,3]" class="task-input">
                </div>
                <button id="compare-arrays-btn" class="task-button">Сравнить</button>
                <div id="arrays-result" class="task-result"></div>
            </div>

            <!-- Карточка сравнения объектов -->
            <div class="task-card">
                <h3 class="task-title">Сравнение объектов</h3>
                <p class="task-description">Функция isEqualObj сравнивает два объекта</p>
                <div class="task-inputs">
                    <input type="text" id="obj1-input" placeholder='{"a":1}' class="task-input">
                    <input type="text" id="obj2-input" placeholder='{"a":1}' class="task-input">
                </div>
                <button id="compare-objs-btn" class="task-button">Сравнить</button>
                <div id="objs-result" class="task-result"></div>
            </div>

            <!-- Карточка качественной разницы -->
            <div class="task-card">
                <h3 class="task-title">Качественная разница</h3>
                <p class="task-description">Максимальная разница (a*b)-(c*d)</p>
                <div class="task-inputs">
                    <input type="text" id="nums-input" placeholder="[5,6,2,7,4]" class="task-input">
                </div>
                <button id="calculate-diff-btn" class="task-button">Вычислить</button>
                <div id="diff-result" class="task-result"></div>
            </div>

            <!-- Новая карточка для поиска анаграмм -->
            <div class="task-card">
                <h3 class="task-title">Поиск анаграмм</h3>
                <p class="task-description">Группировка слов-анаграмм</p>
                <div class="task-inputs">
                    <input type="text" id="anagrams-input" 
                           placeholder="Введите слова через запятую: listen,silent..." 
                           class="task-input">
                </div>
                <button id="find-anagrams-btn" class="task-button">Найти анаграммы</button>
                <div id="anagrams-result" class="task-result"></div>
            </div>
        </div>`;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.addEventListeners();
    }

    addEventListeners() {
        // Сравнение массивов
        document.getElementById('compare-arrays-btn').addEventListener('click', () => {
            try {
                const array1 = JSON.parse(document.getElementById('array1-input').value);
                const array2 = JSON.parse(document.getElementById('array2-input').value);
                const result = this.isEqualArrays(array1, array2);
                document.getElementById('arrays-result').innerHTML = `
                    <div class="result-title">Результат:</div>
                    <div class="result-value">${result ? 'Массивы идентичны' : 'Массивы разные'}</div>
                `;
            } catch (e) {
                document.getElementById('arrays-result').innerHTML = `
                    <div class="result-title">Ошибка:</div>
                    <div class="result-value">Некорректный ввод массивов</div>
                `;
            }
        });

        // Сравнение объектов
        document.getElementById('compare-objs-btn').addEventListener('click', () => {
            try {
                const obj1 = JSON.parse(document.getElementById('obj1-input').value);
                const obj2 = JSON.parse(document.getElementById('obj2-input').value);
                const result = this.isEqualObj(obj1, obj2);
                document.getElementById('objs-result').innerHTML = `
                    <div class="result-title">Результат:</div>
                    <div class="result-value">${result ? 'Объекты идентичны' : 'Объекты разные'}</div>
                `;
            } catch (e) {
                document.getElementById('objs-result').innerHTML = `
                    <div class="result-title">Ошибка:</div>
                    <div class="result-value">Некорректный ввод объектов</div>
                `;
            }
        });

        // Качественная разница
        document.getElementById('calculate-diff-btn').addEventListener('click', () => {
            try {
                const nums = JSON.parse(document.getElementById('nums-input').value);
                const result = this.maxQualityDifference(nums);
                document.getElementById('diff-result').innerHTML = `
                    <div class="result-title">Результат:</div>
                    <div class="result-value">Максимальная разница = ${result}</div>
                `;
            } catch (e) {
                document.getElementById('diff-result').innerHTML = `
                    <div class="result-title">Ошибка:</div>
                    <div class="result-value">Некорректный ввод чисел</div>
                `;
            }
        });

        // Поиск анаграмм
        document.getElementById('find-anagrams-btn').addEventListener('click', () => {
            try {
                const input = document.getElementById('anagrams-input').value;
                const words = input.split(',').map(word => word.trim()).filter(word => word.length > 0);
                const result = this.groupAnagrams(words);
                
                if (result.length === 0) {
                    document.getElementById('anagrams-result').innerHTML = `
                        <div class="result-title">Результат:</div>
                        <div class="result-value">Анаграммы не найдены</div>
                    `;
                } else {
                    document.getElementById('anagrams-result').innerHTML = `
                        <div class="result-title">Результат:</div>
                        <div class="result-value">
                            ${result.map(group => `[${group.join(', ')}]`).join('<br>')}
                        </div>
                    `;
                }
            } catch (e) {
                document.getElementById('anagrams-result').innerHTML = `
                    <div class="result-title">Ошибка:</div>
                    <div class="result-value">Некорректный ввод</div>
                `;
            }
        });
    }
    

    isEqualArrays(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }


    isEqualObj(obj1, obj2) {
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) return false;
        
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) return false;
        }
        
        return true;
    }


    maxQualityDifference(nums) {
        if (!Array.isArray(nums) || nums.length < 4) return 0;
        
        nums.sort((a, b) => a - b);
        const n = nums.length;
        
        const option1 = nums[n-1] * nums[n-2] - nums[0] * nums[1];
        const option2 = nums[n-1] * nums[0] - nums[n-2] * nums[1];
        
        return Math.max(option1, option2);
    }


    groupAnagrams(words) {
        const groups = {};
        
        words.forEach(word => {
            const sorted = word.toLowerCase().split('').sort().join('');
            if (!groups[sorted]) groups[sorted] = [];
            groups[sorted].push(word);
        });
        return Object.values(groups)
            .filter(group => group.length >= 2)
            .map(group => group.sort())
            .sort((a, b) => a[0].localeCompare(b[0]));
    }
}