class Puzzle {
    constructor() {
      this.movimientos = 0;
      this.startTime = null;
      this.endTime = null;
      this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
      this.contadorMovimientos = document.querySelector('#movimientos');
      this.contadorTiempo = document.querySelector('#tiempo');
    }
  
    mostrarLeaderboard() {
      this.leaderboard.sort((a, b) => a.tiempo - b.tiempo);
  
      const tablaLeaderboard = document.createElement('table');
      tablaLeaderboard.innerHTML = '<tr><th>Nombre</th><th>Tiempo</th><th>Moviemientos</th></tr>';
  
      this.leaderboard.forEach(jugador => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${jugador.nombre}</td><td>${jugador.tiempo} segundos</td><td>${jugador.movimientos}</td>`;
        tablaLeaderboard.appendChild(fila);
      });
  
      const leaderboardContainer = document.querySelector('#leaderboard');
      leaderboardContainer.innerHTML = '';
      leaderboardContainer.appendChild(tablaLeaderboard);
    }
  
    registrarResultadoEnLeaderboard(nombre, tiempo, movimientos) {
      this.leaderboard.push({ nombre, tiempo, movimientos });
      localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
      this.mostrarLeaderboard();
    }
  
    isPuzzleComplete() {
      const piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
      for (let i = 1; i < piezas.length; i++) {
        if (piezas[i].id !== 'pieza-' + (i + 1)) {
          return false;
        }
      }
      return true;
    }
  
    swapElements(obj1, obj2) {
      const temp = document.createElement('div');
      obj1.parentNode.insertBefore(temp, obj1);
      obj2.parentNode.insertBefore(obj1, obj2);
      temp.parentNode.insertBefore(obj2, temp);
      temp.parentNode.removeChild(temp);
    }
  
    iniciarTemporizador() {
        this.startTime = new Date(); // Inicia el temporizador
        this.contadorTiempo.textContent = '00:00'; // Inicia el contador de tiempo
    
        this.timerInterval = setInterval(() => {
          const now = new Date().getTime();
          const elapsedTime = now - this.startTime;
    
          const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
          const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.contadorTiempo.textContent = formattedTime;
        }, 1000);
    }
  
    detenerTemporizador() {
        clearInterval(this.timerInterval);
        this.endTime = new Date(); // Finaliza el temporizador
    
        const elapsedTime = this.endTime - this.startTime;
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
        alert(`Has completado el puzzle en ${minutes} minutos y ${seconds} segundos.`);
    }
  
    startGame() {
      try {
        const piezas = Array.from(document.querySelectorAll('.pieza'));
  
        piezas.forEach(pieza => {
          pieza.addEventListener('click', () => {
            try {
              const piezaVacia = document.querySelector('#pieza-vacia');
              const esAdyacente =
                (pieza.cellIndex === piezaVacia.cellIndex && Math.abs(pieza.parentNode.rowIndex - piezaVacia.parentNode.rowIndex) === 1) ||
                (pieza.parentNode.rowIndex === piezaVacia.parentNode.rowIndex && Math.abs(pieza.cellIndex - piezaVacia.cellIndex) === 1);
  
              if (esAdyacente) {
                this.swapElements(pieza, piezaVacia);
                this.movimientos++;
                this.contadorMovimientos.textContent = this.movimientos;
  
                if (this.isPuzzleComplete()) {
                  alert('¡Has completado el puzzle con éxito en ' + this.movimientos + ' movimientos!');
                  this.detenerTemporizador();
                }
              }
            } catch (error) {
              console.log("Error al manejar el evento click: ", error);
            }
          });
        });
      } catch (error) {
        console.log("Error al configurar los controladores de eventos: ", error);
      }
    }
  
    init() {
      try {
        document.querySelector('.inicio').addEventListener('click', () => {
          const pieza5 = document.getElementById('pieza-5');
          const pieza6 = document.getElementById('pieza-6');
          const pieza8 = document.getElementById('pieza-8');
          const idPieza5 = pieza5.id;
  
          pieza5.id = pieza6.id;
          pieza6.id = pieza8.id;
          pieza8.id = idPieza5;
  
          this.segundos = 0;
          this.minutos = 0;
          this.contadorSegundos.textContent = '00';
          this.contadorMinutos.textContent = '00';
          this.iniciarTemporizador();
  
          if (this.isPuzzleComplete()) {
            this.detenerTemporizador();
            const nombreJugador = prompt('Ingresa tu nombre para registrar tu resultado en el leaderboard:');
            alert('¡Has terminado el puzzle con éxito en ' + this.movimientos + ' movimientos!');
            this.registrarResultadoEnLeaderboard(nombreJugador, this.minutos * 60 + this.segundos, this.movimientos);
          }
        });
      } catch (error) {
        console.log("Error al configurar los controladores de eventos: ", error);
      }
    }
  }
  
  // Uso de la clase Puzzle
  const myPuzzle = new Puzzle();
  myPuzzle.init();
  myPuzzle.startGame();
  