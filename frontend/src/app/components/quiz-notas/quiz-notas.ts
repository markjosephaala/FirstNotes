import { Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow'; // 👈 Importamos VexFlow

interface Pregunta {
  id: number;
  notaKey: string;          // 👈 Cambiamos imagenUrl por la nota clave (ej: 'c/4')
  respuestaCorrecta: string;
}

@Component({
  selector: 'app-quiz-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-notas.html',
  styleUrls: ['./quiz-notas.css']
})
export class QuizNotasComponent implements OnInit, OnDestroy {
  // 👈 Referencia al contenedor HTML donde se dibujará el pentagrama
  @ViewChild('canvasContenedor') canvasContenedor!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  // 👈 Actualizamos tu array con las claves correspondientes a las notas de Wikipedia
  preguntas: Pregunta[] = [
    { id: 1, notaKey: 'c/4', respuestaCorrecta: 'Do' },  // Do central
    { id: 2, notaKey: 'd/4', respuestaCorrecta: 'Re' },
    { id: 3, notaKey: 'e/4', respuestaCorrecta: 'Mi' },
    { id: 4, notaKey: 'f/4', respuestaCorrecta: 'Fa' },
    { id: 5, notaKey: 'g/4', respuestaCorrecta: 'Sol' },
    { id: 6, notaKey: 'a/4', respuestaCorrecta: 'La' },
    { id: 7, notaKey: 'b/4', respuestaCorrecta: 'Si' },
    { id: 8, notaKey: 'c/5', respuestaCorrecta: 'Do' },  // Do agudo
    { id: 9, notaKey: 'g/4', respuestaCorrecta: 'Sol' },
    { id: 10, notaKey: 'e/4', respuestaCorrecta: 'Mi' }
  ];

  opciones: string[] = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  indicePreguntaActual: number = 0;
  intervaloCronometro: any;
  esError: boolean = false;
  quizTerminado: boolean = false;
  tiempoInicioPregunta: number = 0;
  milisegundosCorriendo: number = 0; 
  tiemposPorPregunta: number[] = []; 
  mediaMilisegundos: number = 0;
  mostrarPopupTiempo: boolean = false;
  mostrarPopupCorrecto: boolean = false;
  ultimoTiempoEmpleado: string = '';

  ngOnInit() {
    this.iniciarCronometro();
    // Le damos un pequeño timeout inicial para asegurar que el HTML renderizó antes del primer dibujo
    setTimeout(() => this.dibujarPentagrama(), 50);
  }

  ngOnDestroy() {
    this.detenerCronometro();
  }

  get preguntaActual(): Pregunta {
    return this.preguntas[this.indicePreguntaActual];
  }

  // 🎨 MÉTODO CLAVE: Renderiza VexFlow en el HTML
  dibujarPentagrama() {
  if (!this.canvasContenedor) return;

  const div = this.canvasContenedor.nativeElement;
  div.innerHTML = ''; // Limpiamos el pentagrama anterior

  // 1. LIENZO MÁS GRANDE PARA EL ESCALADO
  // Aumentamos el tamaño del lienzo para que el nuevo zoom no corte el pentagrama
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(280, 180); 
  const context = renderer.getContext();

  // ¡MÁS GRANDE! 
  // Subimos de 1.3 a 1.6 para que las notas y las líneas tengan mucha más presencia
  context.scale(1.6, 1.6);

  // 2. PENTAGRAMA AJUSTADO
  // Lo hacemos un pelín más ancho (150px) para dar espacio a la separación de la nota
  const stave = new Stave(10, 10, 150);
  stave.addClef('treble');
  stave.setContext(context).draw();

  // 3. Crear la nota musical
  const notaVexflow = new StaveNote({
    keys: [this.preguntaActual.notaKey],
    duration: 'q' 
  });

  // 4. Crear la voz
  const voice = new Voice({ numBeats: 1, beatValue: 4 });
  voice.addTickables([notaVexflow]);

  // 5. ¡MÁS SEPARACIÓN DE LA CLAVE!
  // Subimos a +65 píxeles para que la nota respire perfectamente
  const inicioDeNota = stave.getNoteStartX() + 65;

  new Formatter().joinVoices([voice]).format([voice], inicioDeNota);

  // 6. Pintar en pantalla
  voice.draw(context, stave);
}

  iniciarCronometro() {
    this.detenerCronometro();
    this.tiempoInicioPregunta = Date.now();
    this.milisegundosCorriendo = 0;

    this.intervaloCronometro = setInterval(() => {
      this.milisegundosCorriendo = Date.now() - this.tiempoInicioPregunta;
      this.cdr.detectChanges();

      if (this.milisegundosCorriendo >= 10000) {
        this.manejarTiempoAgotado();
      }
    }, 10);
  }

  detenerCronometro() {
    if (this.intervaloCronometro) {
      clearInterval(this.intervaloCronometro);
    }
  }

  manejarTiempoAgotado() {
    this.detenerCronometro();
    this.tiemposPorPregunta.push(10000);
    this.mostrarPopupTiempo = true;
    this.esError = false;
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.mostrarPopupTiempo = false;
      this.avanzarPregunta();
    }, 1500);
  }

  verificarRespuesta(opcionSeleccionada: string) {
    if (this.mostrarPopupTiempo || this.mostrarPopupCorrecto) return; 

    if (opcionSeleccionada === this.preguntaActual.respuestaCorrecta) {
      this.detenerCronometro(); 
      
      const tiempoEmpleado = Date.now() - this.tiempoInicioPregunta;
      this.tiemposPorPregunta.push(tiempoEmpleado);
      this.ultimoTiempoEmpleado = (tiempoEmpleado / 1000).toFixed(2);

      this.mostrarPopupCorrecto = true;
      this.esError = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.mostrarPopupCorrecto = false;
        this.avanzarPregunta();
      }, 1000);

    } else {
      this.esError = true;
      this.cdr.detectChanges();
    }
  }

  avanzarPregunta() {
    if (this.indicePreguntaActual < this.preguntas.length - 1) {
      this.indicePreguntaActual++; 
      this.iniciarCronometro();  
      // 🔥 Forzamos a VexFlow a dibujar la nueva nota en el siguiente ciclo de renderizado
      setTimeout(() => this.dibujarPentagrama(), 0);
    } else {
      this.calcularMediaTiempos();
      this.quizTerminado = true;
    }
    this.cdr.detectChanges();
  }

  calcularMediaTiempos() {
    if (this.tiemposPorPregunta.length === 0) return;
    const sumaTotal = this.tiemposPorPregunta.reduce((acc, t) => acc + t, 0);
    this.mediaMilisegundos = sumaTotal / this.tiemposPorPregunta.length;
  }

  reiniciarQuiz() {
    this.indicePreguntaActual = 0;
    this.tiemposPorPregunta = [];
    this.mediaMilisegundos = 0;
    this.quizTerminado = false;
    this.esError = false;
    this.mostrarPopupTiempo = false;
    this.mostrarPopupCorrecto = false;
    this.ultimoTiempoEmpleado = '';
    this.iniciarCronometro();
    this.cdr.detectChanges();
    // 🔥 Redibujamos el primer pentagrama al reiniciar
    setTimeout(() => this.dibujarPentagrama(), 0);
  }
}