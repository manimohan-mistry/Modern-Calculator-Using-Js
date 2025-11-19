let display = document.getElementById('display');
        let currentValue = '0';
        let previousValue = '';
        let operation = '';
        let shouldResetDisplay = false;
        let fullExpression = '';

        function updateDisplay() {
            if (fullExpression && !shouldResetDisplay) {
                display.textContent = fullExpression;
            } else {
                display.textContent = currentValue;
            }
            display.style.animation = 'none';
            setTimeout(() => display.style.animation = '', 10);
        }

        function clearDisplay() {
            currentValue = '0';
            previousValue = '';
            operation = '';
            shouldResetDisplay = false;
            fullExpression = '';
            updateDisplay();
            createSparkles(event);
        }

        function appendNumber(num) {
            if (shouldResetDisplay) {
                currentValue = '0';
                shouldResetDisplay = false;
            }
            
            if (num === '.' && currentValue.includes('.')) return;
            
            if (currentValue === '0' && num !== '.') {
                currentValue = num;
            } else {
                currentValue += num;
            }
            
            if (fullExpression && operation) {
                fullExpression = previousValue + ' ' + operation + ' ' + currentValue;
            }
            
            updateDisplay();
        }

        function appendOperator(op) {
            if (operation && !shouldResetDisplay) {
                calculate();
            }
            
            previousValue = currentValue;
            operation = op;
            fullExpression = currentValue + ' ' + op + ' ';
            shouldResetDisplay = true;
            updateDisplay();
        }

        function calculate() {
            if (!operation || !previousValue) return;
            
            let prev = parseFloat(previousValue);
            let current = parseFloat(currentValue);
            let result;
            
            switch(operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            currentValue = result.toString();
            operation = '';
            previousValue = '';
            fullExpression = '';
            shouldResetDisplay = true;
            updateDisplay();
            createSparkles(event);
        }

        // Sparkle effect
        function createSparkles(e) {
            if (!e) return;
            const rect = e.target.getBoundingClientRect();
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = rect.left + rect.width / 2 + 'px';
                sparkle.style.top = rect.top + rect.height / 2 + 'px';
                sparkle.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`;
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
        }

        // Add pressed class on click
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                this.classList.add('pressed');
                setTimeout(() => this.classList.remove('pressed'), 300);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            if (e.key === '.') appendNumber('.');
            if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
            if (e.key === 'Enter' || e.key === '=') calculate();
            if (e.key === 'Escape' || e.key === 'c') clearDisplay();
        });