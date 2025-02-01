// Función para crear una encuesta
const crearEncuesta = (titulo) => ({
    titulo,
    preguntas: [],
    correctas: 0,
    incorrectas: 0
});

// Función para agregar preguntas
const agregarPregunta = (encuesta, pregunta, opciones, correcta) => ({
    ...encuesta,
    preguntas: [...encuesta.preguntas, { pregunta, opciones, correcta, votos: Array(opciones.length).fill(0) }]
});

// Función para registrar votos sin modificar el estado original
const votar = (encuesta, preguntaIndex, opcionIndex) => ({
    ...encuesta,
    preguntas: encuesta.preguntas.map((p, i) => 
        i === preguntaIndex 
        ? { ...p, votos: p.votos.map((v, j) => j === opcionIndex ? v + 1 : v) } 
        : p
    )
});

// Función para realizar la encuesta
const realizarEncuesta = (encuesta) => {
    console.clear();
    console.log(`📊 Encuesta: ${encuesta.titulo}\n`);
    
    let correctas = 0;
    let incorrectas = 0;
    let nuevaEncuesta = { ...encuesta };

    nuevaEncuesta.preguntas.forEach((pregunta, index) => {
        console.log(`\n${index + 1}. ${pregunta.pregunta}`);

        pregunta.opciones.forEach((opcion, i) => {
            console.log(`   ${String.fromCharCode(97 + i)}. ${opcion}`);
        });

        let opcionesTexto = pregunta.opciones
            .map((opcion, i) => `${String.fromCharCode(97 + i)}. ${opcion}`)
            .join("\n");

        let respuestaUsuario;
        do {
            respuestaUsuario = prompt(`\n${pregunta.pregunta}\nElige una opción:\n${opcionesTexto}\nEscribe la letra de tu respuesta:`)
                ?.trim()?.toLowerCase();
        } while (!respuestaUsuario);

        let opcionIndex = respuestaUsuario.charCodeAt(0) - 97;

        if (pregunta.opciones[opcionIndex] === pregunta.correcta) {
            console.log("✅ Respuesta correcta.");
            correctas++;
        } else {
            console.log(`❌ Respuesta incorrecta. La correcta era: ${pregunta.correcta}`);
            incorrectas++;
        }

        // Registrar voto sin modificar el estado original
        nuevaEncuesta = votar(nuevaEncuesta, index, opcionIndex);
    });

    nuevaEncuesta.correctas = correctas;
    nuevaEncuesta.incorrectas = incorrectas;

    mostrarResultados(nuevaEncuesta);
};

// Función para mostrar los resultados
const mostrarResultados = (encuesta) => {
    console.log(`\nResultados Finales:`);
    encuesta.preguntas.forEach((pregunta, index) => {
        console.log(`\n${index + 1}. ${pregunta.pregunta}`);
        pregunta.opciones.forEach((opcion, i) => {
            console.log(`   ${opcion}: ${pregunta.votos[i]} votos`);
        });
    });
    console.log(`\n✅ Correctas: ${encuesta.correctas} | ❌ Incorrectas: ${encuesta.incorrectas}`);
};

// Crear encuesta
let encuesta = crearEncuesta("Encuesta General");

// Agregar preguntas iniciales
const preguntasIniciales = [
    { pregunta: "¿Cuál es tu color favorito?", opciones: ["Rojo", "Azul", "Verde", "Otro"], correcta: "Azul" },
    { pregunta: "¿Qué deporte prefieres?", opciones: ["Fútbol", "Baloncesto", "Tenis", "Otro"], correcta: "Fútbol" },
    { pregunta: "¿Cuál auto es el más veloz?", opciones: ["Bugati", "Porshe", "Ferrari", "Otro"], correcta: "Bugati" },
    { pregunta: "¿Qué color forman el rojo con el amarillo?", opciones: ["Naranjo", "Verde", "Café", "Otro"], correcta: "Naranjo" },
    { pregunta: "¿Cómo se llama el perro de Superman?", opciones: ["Krypto", "Rypto", "Doko", "Otro"], correcta: "Krypto" },
    { pregunta: "¿Cómo se llama Batman cuando no es Batman?", opciones: ["José", "Clark", "Bruce", "Otro"], correcta: "Bruce" },
    { pregunta: "¿Cómo se llama el perro de Superman?", opciones: ["Krypto", "Rypto", "Doko", "Otro"], correcta: "Krypto" },
    { pregunta: "¿Cuál es la capital de Francia?", opciones: ["Madrid", "París", "Londres", "Otro"], correcta: "París" }
];

preguntasIniciales.forEach(p => {
    encuesta = agregarPregunta(encuesta, p.pregunta, p.opciones, p.correcta);
});

// Permitir al usuario agregar más preguntas
let agregarOtraPregunta = confirm("¿Quieres agregar una nueva pregunta?");

while (agregarOtraPregunta) {
    let nuevaPregunta = "";
    do {
        nuevaPregunta = prompt("Ingresa la nueva pregunta:")?.trim();
    } while (!nuevaPregunta);

    let opciones = [];
    let agregarOpcion = true;
    while (agregarOpcion) {
        let opcion = "";
        do {
            opcion = prompt("Ingresa una opción de respuesta:")?.trim();
        } while (!opcion);
        opciones.push(opcion);
        agregarOpcion = confirm("¿Quieres agregar otra opción?");
    }

    let correcta = "";
    do {
        correcta = prompt("¿Cuál es la respuesta correcta?")?.trim();
    } while (!correcta);

    if (opciones.length > 1) {
        encuesta = agregarPregunta(encuesta, nuevaPregunta, opciones, correcta);
    } else {
        alert("Error: La pregunta debe tener al menos dos opciones y una respuesta correcta.");
    }

    agregarOtraPregunta = confirm("¿Quieres agregar otra nueva pregunta?");
}

// Realizar la encuesta
realizarEncuesta(encuesta);
