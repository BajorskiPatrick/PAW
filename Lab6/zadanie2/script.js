document.addEventListener('DOMContentLoaded', () => {

    let totalScore = 0;
    let isPropagationActive = true;
    let pointValues = { blue: 1, red: 2, yellow: 5 };

    let isYellowDisabled = false;
    let isRedDisabled = false;
    let isAllDisabled = false;

    const scoreDisplay = document.getElementById('score-display');
    const logArea = document.getElementById('log-area');

    const targetBlue = document.getElementById('target-blue');
    const targetRed = document.getElementById('target-red');
    const targetYellow = document.getElementById('target-yellow');

    const btnReset = document.getElementById('btn-reset');
    const btnTogglePropagation = document.getElementById('btn-toggle-propagation');
    const btnClearLog = document.getElementById('btn-clear-log');
    const orderRadios = document.querySelectorAll('input[name="orderOptions"]');


    function logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        logArea.appendChild(p);
        logArea.scrollTop = logArea.scrollHeight;
    }

    function updateScoreDisplay() {
        scoreDisplay.textContent = totalScore;
    }

    function checkThresholds() {
        isYellowDisabled = false;
        isRedDisabled = false;
        isAllDisabled = false;

        if (totalScore > 50) {
            isAllDisabled = true;
            isRedDisabled = true;
            isYellowDisabled = true;
            logMessage("WYNIK > 50: Strzelnica zamknięta!");
        } else if (totalScore > 30) {
            isRedDisabled = true;
            isYellowDisabled = true;
            logMessage("WYNIK > 30: Zablokowano cel czerwony i żółty.");
        } else if (totalScore > 20) {
            isYellowDisabled = true;
            logMessage("WYNIK > 20: Zablokowano cel żółty.");
        }

        updateTargetStyles();
    }

    function updateTargetStyles() {
        targetYellow.classList.toggle('target-disabled', isYellowDisabled || isRedDisabled || isAllDisabled);
        targetRed.classList.toggle('target-disabled', isRedDisabled || isAllDisabled);
        targetBlue.classList.toggle('target-disabled', isAllDisabled);
    }

    function handleTargetClick(event) {
        const target = event.currentTarget;
        const colorName = target.dataset.color;
        const pointsKey = target.dataset.pointsKey;

        let isDisabled = false;
        if (pointsKey === 'yellow' && (isYellowDisabled || isRedDisabled || isAllDisabled)) isDisabled = true;
        if (pointsKey === 'red' && (isRedDisabled || isAllDisabled)) isDisabled = true;
        if (pointsKey === 'blue' && isAllDisabled) isDisabled = true;

        if (isDisabled) {
            if (!isPropagationActive) event.stopPropagation();
            return;
        }

        if (!isPropagationActive) {
            event.stopPropagation();
        }

        const points = pointValues[pointsKey];
        totalScore += points;
        logMessage(`Naciśnięto ${colorName} o wartości ${points}`);

        updateScoreDisplay();
        checkThresholds();
    }

    function resetGame() {
        totalScore = 0;
        isPropagationActive = true;
        
        isYellowDisabled = false;
        isRedDisabled = false;
        isAllDisabled = false;

        btnTogglePropagation.textContent = 'Propagacja AKTYWNA';
        btnTogglePropagation.classList.add('btn-info');
        btnTogglePropagation.classList.remove('btn-danger');

        document.getElementById('order-1-2-5').checked = true;
        pointValues = { blue: 1, red: 2, yellow: 5 };

        updateScoreDisplay();
        updateTargetStyles();
        clearLog();
        logMessage("Gra zresetowana do stanu początkowego.");
    }

    function togglePropagation() {
        isPropagationActive = !isPropagationActive;
        if (isPropagationActive) {
            btnTogglePropagation.textContent = 'Propagacja AKTYWNA';
            btnTogglePropagation.classList.add('btn-info');
            btnTogglePropagation.classList.remove('btn-danger');
            logMessage("Propagacja WŁĄCZONA.");
        } else {
            btnTogglePropagation.textContent = 'Propagacja WYŁĄCZONA';
            btnTogglePropagation.classList.remove('btn-info');
            btnTogglePropagation.classList.add('btn-danger');
            logMessage("Propagacja WYŁĄCZONA.");
        }
    }

    function clearLog() {
        logArea.innerHTML = '';
    }

    function changeOrder(event) {
        const value = event.target.value;
        const [blue, red, yellow] = value.split('-').map(Number);

        pointValues = { blue, red, yellow };
        logMessage(`Zmieniono punktację: N=${blue}, C=${red}, Ż=${yellow}`);
    }

    targetBlue.addEventListener('click', handleTargetClick);
    targetRed.addEventListener('click', handleTargetClick);
    targetYellow.addEventListener('click', handleTargetClick);

    btnReset.addEventListener('click', resetGame);
    btnTogglePropagation.addEventListener('click', togglePropagation);
    btnClearLog.addEventListener('click', clearLog);

    orderRadios.forEach(radio => {
        radio.addEventListener('change', changeOrder);
    });

    updateScoreDisplay();
    updateTargetStyles();
    logMessage("Strzelnica gotowa. Domyślna punktacja 1-2-5.");
});