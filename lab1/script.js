window.onload = function() {
    let a = '';
    let b = '';
    let index_color = 0;
    let index_color_result = 0;
    let expressionResult = '';
    let selectedOperation = null;
    let accumulatedSum = 0;
    let accumulatedDiff = 0;

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    };
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
        if (b !== '') {
            accumulatedSum = (+a) + (+b);
        } else {
            accumulatedSum += +a;
        }
        a = '';
        b = '';
        outputElement.innerHTML = '0';
    };
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
        if (b !== '') {
            accumulatedDiff = (+a) - (+b);
        } else {
            accumulatedDiff = +a;
        }
        a = '';
        b = '';
        outputElement.innerHTML = '0';
    };
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };
    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return;
        selectedOperation = '%';
    };
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = '0';
    };
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;
        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = accumulatedSum + (+b);
                accumulatedSum = expressionResult;
                break;
            case '-':
                expressionResult = accumulatedDiff - (+b);
                accumulatedDiff = expressionResult;
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            case '%':
                if (b === '') return;
                expressionResult = (+a) * (+b) / 100;
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };
    document.getElementById("btn_op_derivsin").onclick = function() {
        if (a === '') return;
        expressionResult = parseFloat(Math.cos((+a) * (Math.PI / 180)).toFixed(6));
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            a = (-a).toString();
            outputElement.innerHTML = a;
        } else {
            b = (-b).toString();
            outputElement.innerHTML = b;
        }
    };
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    };
    document.getElementById("btn_change_bg").onclick = function() {
        const colors = ['#767676','#141414'];
        document.querySelector('.calculator_black').style.backgroundColor = colors[index_color];
        index_color= (index_color + 1) % colors.length;
    };
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a === '') return;
        expressionResult = Math.sqrt(+a).toFixed(6);
        a = expressionResult.toString();
        outputElement.innerHTML = a;
    };
    document.getElementById("btn_op_square").onclick = function() {
        if (a === '') return;
        expressionResult = Math.pow(+a, 2).toFixed(6);
        a = expressionResult.toString();
        outputElement.innerHTML = a;
    };
    document.getElementById("btn_op_factorial").onclick = function() {
        if (a === '') return;
        let num = +a;
        if (num < 0 || !Number.isInteger(num)) return;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        expressionResult = result.toString();
        a = expressionResult;
        outputElement.innerHTML = a;
    };
    document.getElementById("btn_op_triple_zero").onclick = function() {
        if (!selectedOperation) {
            a += '000';
            outputElement.innerHTML = a;
        } else {
            b += '000';
            outputElement.innerHTML = b;
        }
    };
    document.getElementById("btn_change_result_color").onclick = function() {
        const colors = ['#ffcccc', '#f50', '#ffffff'];
        outputElement.style.color = colors[index_color_result];
        index_color_result = (index_color_result + 1) % colors.length;
    };
};