class Encuesta {
    constructor(titulo) {
        this.titulo = titulo;
        this.preguntas = [];
        this.correctas = 0;
        this.incorrectas = 0;
    }

    agregarPregunta(pregunta, opciones, correcta) {
        this.preguntas.push({
            pregunta,
            opciones,
            correcta,
            votos: Array(opciones.length).fill(0),
        });
    }

    votar(preguntaIndex, opcionIndex) {
        if (this.preguntas[preguntaIndex] && this.preguntas[preguntaIndex].opciones[opcionIndex]) {
            this.preguntas[preguntaIndex].votos[opcionIndex]++;
        }
    }

    realizarEncuesta() {
        console.clear();
        console.log(`📊 Encuesta: ${this.titulo}\n`);

        this.preguntas.forEach((pregunta, index) => {
            console.log(`\n${index + 1}. ${pregunta.pregunta}`);
            
            // Mostrar las opciones antes de pedir la respuesta en consola
            pregunta.opciones.forEach((opcion, opcionIndex) => {
                console.log(`   ${String.fromCharCode(97 + opcionIndex)}. ${opcion}`);
            });

            // Construir el texto para el prompt, incluyendo las opciones
            let opcionesTexto = pregunta.opciones
                .map((opcion, opcionIndex) => `${String.fromCharCode(97 + opcionIndex)}. ${opcion}`)
                .join("\n");

            let respuestaUsuario = "";
            // Pedir respuesta y validar que no esté en blanco
            do {
                respuestaUsuario = prompt(`\n${pregunta.pregunta}\nElige una opción:\n${opcionesTexto}\nEscribe la letra de tu respuesta:`)?.trim()?.toLowerCase();
                if (!respuestaUsuario) {
                    alert("La respuesta no puede estar vacía. Por favor, ingresa una opción.");
                }
            } while (!respuestaUsuario);

            let opcionIndex = respuestaUsuario.charCodeAt(0) - 97;

            if (pregunta.opciones[opcionIndex] === pregunta.correcta) {
                console.log("✅ Respuesta correcta.");
                this.correctas++;
            } else {
                console.log(`❌ Respuesta incorrecta. La correcta era: ${pregunta.correcta}`);
                this.incorrectas++;
            }

            // Registrar el voto
            this.votar(index, opcionIndex);
        });

        this.mostrarResultados();
    }

    mostrarResultados() {
        console.log(`\nResultados Finales:`);
        this.preguntas.forEach((pregunta, index) => {
            console.log(`\n${index + 1}. ${pregunta.pregunta}`);
            pregunta.opciones.forEach((opcion, opcionIndex) => {
                console.log(`   ${opcion}: ${pregunta.votos[opcionIndex]} votos`);
            });
        });
        console.log(`\n✅ Correctas: ${this.correctas} | ❌ Incorrectas: ${this.incorrectas}`);
    }
}

// Crear encuesta
const encuesta = new Encuesta("Encuesta General");

// Agregar preguntas iniciales
encuesta.agregarPregunta("¿Cuál es tu color favorito?", ["Rojo", "Azul", "Verde", "Otro"], "Azul");
encuesta.agregarPregunta("¿Qué deporte prefieres?", ["Fútbol", "Baloncesto", "Tenis", "Otro"], "Fútbol");
encuesta.agregarPregunta("¿Cuál auto es el más veloz?", ["Bugati", "Porshe", "Ferrari", "Otro"], "Bugati");
encuesta.agregarPregunta("¿Qué color forman el rojo con el amarillo?", ["Naranjo", "Verde", "Café", "Otro"], "Naranjo");
encuesta.agregarPregunta("¿Cómo se llama el perro de Superman?", ["Krypto", "Rypto", "Doko", "Otro"], "Krypto");
encuesta.agregarPregunta("¿Cómo se llama Batman cuando no es batman?", ["José", "Clark", "Bruce", "Otro"], "Bruce");
encuesta.agregarPregunta("¿Cómo se llama el perro de Superman?", ["Krypto", "Rypto", "Doko", "Otro"], "Krypto");
encuesta.agregarPregunta("¿Cuál es la capital de Francia?", ["Madrid", "París", "Londres", "Otro"], "París");

// Permitir al usuario agregar más preguntas
let agregarPregunta = confirm("¿Quieres agregar una nueva pregunta?");

while (agregarPregunta) {
    // Pedir la nueva pregunta y validar que no esté vacía
    let nuevaPregunta = "";
    do {
        nuevaPregunta = prompt("Ingresa la nueva pregunta:")?.trim();
        if (!nuevaPregunta) {
            alert("La pregunta no puede estar vacía.");
        }
    } while (!nuevaPregunta);

    let opciones = [];
    // Agregar opciones dinámicamente
    let agregarOpcion = true;
    while (agregarOpcion) {
        let opcion = "";
        do {
            opcion = prompt("Ingresa una opción de respuesta:")?.trim();
            if (!opcion) {
                alert("Debes ingresar al menos una opción válida.");
            }
        } while (!opcion);
        opciones.push(opcion);
        agregarOpcion = confirm("¿Quieres agregar otra opción?");
    }

    // Elegir la respuesta correcta y validar que no esté vacía
    let correcta = "";
    do {
        correcta = prompt("¿Cuál es la respuesta correcta?")?.trim();
        if (!correcta) {
            alert("La respuesta correcta no puede estar vacía.");
        }
    } while (!correcta);

    if (opciones.length > 1) {
        encuesta.agregarPregunta(nuevaPregunta, opciones, correcta);
    } else {
        alert("Error: La pregunta debe tener al menos dos opciones y una respuesta correcta.");
    }

    agregarPregunta = confirm("¿Quieres agregar otra nueva pregunta?");
}

// Realizar la encuesta con todas las preguntas
encuesta.realizarEncuesta();
