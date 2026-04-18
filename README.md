# JuegoMatematico
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego Matemático</title>
    <link rel="stylesheet" href="style/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <!-- Pantalla de inicio -->
        <div id="startScreen">
            <h1>Juego Matemático</h1>
            <div class="input-group">
                <label for="playerName">¿Cuál es tu nombre?</label>
                <input type="text" id="playerName" placeholder="Ingresa tu nombre">
            </div>
            <button onclick="startGame()">Comenzar Juego</button>
        </div>

        <!-- Pantalla del juego -->
        <div id="gameScreen" class="hidden">
            <h1>Juego Matemático</h1>
            <div class="game-info">
                <span>Jugador: <span id="playerDisplay"></span></span>
                <span>Puntos: <span id="scoreDisplay">0</span></span>
            </div>
            <div class="progress-bar">
                <div class="progress" id="progressBar"></div>
            </div>
            <div class="question-container">
                <div class="question" id="questionText"></div>
            </div>
            <div class="input-group">
                <input type="number" id="answerInput" placeholder="Tu respuesta"
                    onkeypress="if(event.key==='Enter') checkAnswer()">
            </div>
            <button onclick="checkAnswer()">Verificar Respuesta</button>
        </div>

        <!-- Pantalla de resultados -->
        <div id="resultsScreen" class="hidden">
            <h1>¡Juego Terminado!</h1>
            <div class="results">
                <h2>¡Felicidades <span id="playerNameResults"></span>!</h2>
                <div class="score-display" id="finalScore"></div>
                <div class="message" id="resultMessage"></div>
                <button class="play-again-btn" onclick="location.reload()">Jugar de Nuevo</button>
            </div>
        </div>
    </div>

    <script>
        let player = {
            name: '',
            score: 0,
            currentQuestion: 0,
            totalQuestions: 10
        };

        let currentOperation = {};

        function startGame() {
            const playerName = document.getElementById('playerName').value.trim();
            if (playerName === '') {
                alert('Por favor ingresa tu nombre');
                return;
            }

            player.name = playerName;
            player.score = 0;
            player.currentQuestion = 0;

            document.getElementById('startScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.remove('hidden');
            document.getElementById('playerDisplay').textContent = playerName;

            generateQuestion();
        }

        function generateQuestion() {
            const operations = ['suma', 'resta', 'multiplicación'];
            const operation = operations[Math.floor(Math.random() * operations.length)];

            let num1, num2;

            switch (operation) {
                case 'suma':
                    num1 = Math.floor(Math.random() * 50) + 1;
                    num2 = Math.floor(Math.random() * 50) + 1;
                    currentOperation = {
                        text: `${num1} + ${num2}`,
                        answer: num1 + num2
                    };
                    break;
                case 'resta':
                    num1 = Math.floor(Math.random() * 50) + 1;
                    num2 = Math.floor(Math.random() * num1);
                    currentOperation = {
                        text: `${num1} - ${num2}`,
                        answer: num1 - num2
                    };
                    break;
                case 'multiplicación':
                    num1 = Math.floor(Math.random() * 12) + 1;
                    num2 = Math.floor(Math.random() * 12) + 1;
                    currentOperation = {
                        text: `${num1} × ${num2}`,
                        answer: num1 * num2
                    };
                    break;
            }

            document.getElementById('questionText').textContent = currentOperation.text + ' = ?';
            document.getElementById('answerInput').value = '';
            document.getElementById('answerInput').focus();

            updateProgress();
        }

        function checkAnswer() {
            const userAnswer = parseInt(document.getElementById('answerInput').value);

            if (isNaN(userAnswer)) {
                alert('Por favor ingresa un número válido');
                return;
            }

            if (userAnswer === currentOperation.answer) {
                player.score += 10;
            }

            player.currentQuestion++;

            if (player.currentQuestion < player.totalQuestions) {
                document.getElementById('scoreDisplay').textContent = player.score;
                generateQuestion();
            } else {
                endGame();
            }
        }

        function updateProgress() {
            const progress = (player.currentQuestion / player.totalQuestions) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function endGame() {
            document.getElementById('gameScreen').classList.add('hidden');
            document.getElementById('resultsScreen').classList.remove('hidden');

            document.getElementById('playerNameResults').textContent = player.name;
            document.getElementById('finalScore').textContent = player.score + ' puntos';

            let message = '';
            const percentage = (player.score / (player.totalQuestions * 10)) * 100;

            if (percentage === 100) {
                message = '¡Eres un genio matemático! ';
            } else if (percentage >= 80) {
                message = '¡Excelente trabajo! ';
            } else if (percentage >= 60) {
                message = '¡Muy bien! Sigue practicando. ';
            } else if (percentage >= 40) {
                message = 'Bien, pero puedes mejorar. ';
            } else {
                message = 'Sigue intentando, ¡lo conseguirás! ';
            }

            document.getElementById('resultMessage').textContent = message;
        }
    </script>











































    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

</body>

</html>
