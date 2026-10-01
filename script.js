/* ==========================================
   ELEMENTOS DEL HTML
========================================== */

const materia = document.getElementById("materia");
const pregunta = document.getElementById("pregunta");
const btnEnviar = document.getElementById("btnEnviar");
const btnEjercicio = document.getElementById("btnEjercicio");
const btnLimpiar = document.getElementById("btnLimpiar");
const modoOscuro = document.getElementById("modoOscuro");
const chat = document.getElementById("chat");
const error = document.getElementById("error");


/* ==========================================
   HISTORIAL
========================================== */

let historial = [];


/* ==========================================
   ENVIAR PREGUNTA
========================================== */

btnEnviar.addEventListener("click", function () {

    const materiaSeleccionada = materia.value;
    const preguntaUsuario = pregunta.value.trim();

    // Limpiar error
    error.textContent = "";


    /* VALIDACIÓN */

    if (materiaSeleccionada === "") {

        error.textContent = "⚠️ Seleccioná una materia.";

        materia.focus();

        return;
    }


    if (preguntaUsuario === "") {

        error.textContent = "⚠️ Escribí una pregunta.";

        pregunta.focus();

        return;
    }


    if (preguntaUsuario.length < 5) {

        error.textContent =
            "⚠️ La pregunta debe tener al menos 5 caracteres.";

        pregunta.focus();

        return;
    }


    /* MOSTRAR PREGUNTA */

    agregarMensaje(
        "usuario",
        preguntaUsuario
    );


    /* MOSTRAR CARGANDO */

    mostrarLoading();


    /*
        En una aplicación real, en este lugar
        se realizaría la llamada a la API de IA.
    */

    setTimeout(function () {

        eliminarLoading();


        const respuesta = generarRespuesta(
            materiaSeleccionada,
            preguntaUsuario
        );


        agregarMensaje(
            "ia",
            respuesta
        );


        /* GUARDAR EN HISTORIAL */

        historial.push({

            materia: materiaSeleccionada,

            pregunta: preguntaUsuario,

            respuesta: respuesta,

            fecha: new Date().toLocaleTimeString()

        });


        /* LIMPIAR CAMPO */

        pregunta.value = "";


    }, 1200);

});


/* ==========================================
   GENERAR EJERCICIO
========================================== */

btnEjercicio.addEventListener("click", function () {

    const materiaSeleccionada = materia.value;

    error.textContent = "";


    if (materiaSeleccionada === "") {

        error.textContent =
            "⚠️ Seleccioná una materia primero.";

        materia.focus();

        return;
    }


    agregarMensaje(
        "usuario",
        "Generame un ejercicio de " + materiaSeleccionada
    );


    mostrarLoading();


    setTimeout(function () {

        eliminarLoading();


        const ejercicio =
            generarEjercicio(materiaSeleccionada);


        agregarMensaje(
            "ia",
            ejercicio
        );


        historial.push({

            materia: materiaSeleccionada,

            pregunta:
                "Generar ejercicio",

            respuesta: ejercicio,

            fecha: new Date().toLocaleTimeString()

        });


    }, 1000);

});


/* ==========================================
   GENERAR RESPUESTA
========================================== */

function generarRespuesta(materia, pregunta) {

    /*
        Esta función es solamente una demostración.

        Para conectar una IA real, esta función
        debería enviar la pregunta a un backend
        que se comunique con una API de IA.
    */


    const respuestas = {

        "Matemática":
            `La pregunta pertenece al área de Matemática.

Para resolverla correctamente, primero debemos identificar los datos del problema y qué resultado necesitamos obtener.

📌 Pregunta recibida:
"${pregunta}"

En la versión conectada a una IA, aquí aparecería una explicación personalizada paso a paso.`,



        "Historia":
            `La pregunta pertenece a Historia.

Para responderla correctamente debemos tener en cuenta el contexto histórico, las causas, los acontecimientos principales y sus consecuencias.

📌 Pregunta recibida:
"${pregunta}"

En la versión conectada a una IA, aquí aparecería una explicación detallada y adaptada al nivel del estudiante.`,



        "Geografía":
            `La pregunta pertenece a Geografía.

Para analizar este tema podemos estudiar la ubicación, las características del territorio, la población y los factores naturales o económicos relacionados.

📌 Pregunta recibida:
"${pregunta}"

La IA podría desarrollar una explicación completa sobre el tema.`,



        "Lengua":
            `La consulta corresponde a Lengua y Literatura.

Podemos analizar el significado del texto, sus recursos literarios, estructura, personajes o contexto.

📌 Pregunta recibida:
"${pregunta}"

La IA podría ayudarte con una explicación y ejemplos.`,



        "Inglés":
            `La consulta corresponde a Inglés.

Podemos trabajar vocabulario, gramática, traducción, comprensión lectora o conversación.

📌 Pregunta recibida:
"${pregunta}"

La IA podría explicarte el tema con ejemplos en inglés y español.`,



        "Programación":
            `La consulta corresponde a Programación.

Para resolver un problema de programación normalmente debemos analizar el objetivo, los datos de entrada, el proceso y el resultado esperado.

📌 Pregunta recibida:
"${pregunta}"

Una IA podría explicarte el concepto y mostrarte ejemplos de código.`,



        "Física":
            `La consulta corresponde a Física.

Para resolver un problema debemos identificar las variables, las unidades y las fórmulas correspondientes.

📌 Pregunta recibida:
"${pregunta}"

La IA podría mostrarte el procedimiento paso a paso.`,



        "Biología":
            `La consulta corresponde a Biología.

Podemos analizar conceptos relacionados con los seres vivos, células, genética, ecosistemas y otros temas.

📌 Pregunta recibida:
"${pregunta}"

La IA podría desarrollar una explicación adaptada a tu nivel.`
    };


    return respuestas[materia] ||
        "Seleccioná una materia para comenzar.";
}


/* ==========================================
   GENERAR EJERCICIOS
========================================== */

function generarEjercicio(materia) {

    const ejercicios = {

        "Matemática":
            `📝 EJERCICIO DE MATEMÁTICA

Un estudiante compra 3 cuadernos que cuestan $2.500 cada uno.

¿Cuánto dinero debe pagar en total?

💡 Consejo:
Pensá qué operación matemática tenés que realizar.

Cuando tengas el resultado, pedime que te diga si es correcto.`,


        "Historia":
            `📝 EJERCICIO DE HISTORIA

Explicá con tus palabras tres causas importantes de la Revolución Francesa.

💡 Consejo:
Podés pensar en aspectos económicos, sociales y políticos.`,


        "Geografía":
            `📝 EJERCICIO DE GEOGRAFÍA

Explicá la diferencia entre clima y tiempo meteorológico.

Después mencioná un ejemplo de cada uno.`,


        "Lengua":
            `📝 EJERCICIO DE LENGUA

Leé la siguiente oración:

"El viento susurraba entre los árboles."

¿Qué recurso literario aparece en esta oración?

Explicá por qué.`,


        "Inglés":
            `📝 ENGLISH EXERCISE

Complete the sentence:

"I _______ to school every day."

A) go
B) goes
C) going

Elegí la respuesta correcta y explicá por qué.`,


        "Programación":
            `📝 EJERCICIO DE PROGRAMACIÓN

Imaginá que necesitás crear un programa que pida dos números al usuario y muestre su suma.

¿Qué pasos debería realizar el programa?`,


        "Física":
            `📝 EJERCICIO DE FÍSICA

Un automóvil recorre 100 kilómetros en 2 horas.

¿Cuál es su velocidad promedio?

Recordá:

Velocidad = distancia / tiempo`,


        "Biología":
            `📝 EJERCICIO DE BIOLOGÍA

Explicá cuál es la función principal de las mitocondrias dentro de una célula.

💡 Consejo:
Pensá en la producción de energía.`
    };


    return ejercicios[materia] ||
        "No hay un ejercicio disponible para esta materia.";
}


/* ==========================================
   AGREGAR MENSAJE AL CHAT
========================================== */

function agregarMensaje(tipo, texto) {

    /* Eliminar mensaje de bienvenida */

    const welcome = chat.querySelector(".welcome");

    if (welcome) {

        welcome.remove();

    }


    const mensaje = document.createElement("div");

    mensaje.classList.add("message");


    if (tipo === "usuario") {

        mensaje.classList.add("user-message");

        mensaje.innerHTML = `

            <div class="message-label">
                👤 Vos
            </div>

            <div class="message-content">
                ${escapeHTML(texto)}
            </div>

        `;

    } else {

        mensaje.classList.add("ai-message");

        mensaje.innerHTML = `

            <div class="message-label">
                🤖 StudyIA
            </div>

            <div class="message-content">
                ${escapeHTML(texto)}
            </div>

        `;

    }


    chat.appendChild(mensaje);


    /* Scroll automático */

    chat.scrollTop = chat.scrollHeight;
}


/* ==========================================
   LOADING
========================================== */

function mostrarLoading() {

    const loading = document.createElement("div");

    loading.classList.add(
        "message",
        "ai-message"
    );

    loading.id = "loading";


    loading.innerHTML = `

        <div class="message-label">
            🤖 StudyIA
        </div>

        <div class="message-content">

            <div class="loading">

                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>

                <span>
                    Pensando...
                </span>

            </div>

        </div>

    `;


    chat.appendChild(loading);

    chat.scrollTop = chat.scrollHeight;
}


/* ==========================================
   ELIMINAR LOADING
========================================== */

function eliminarLoading() {

    const loading =
        document.getElementById("loading");

    if (loading) {

        loading.remove();

    }
}


/* ==========================================
   LIMPIAR HISTORIAL
========================================== */

btnLimpiar.addEventListener("click", function () {

    historial = [];


    chat.innerHTML = `

        <div class="welcome">

            <div class="robot">
                🤖
            </div>

            <h3>
                ¡Hola! Soy StudyIA
            </h3>

            <p>
                Seleccioná una materia y haceme
                una pregunta para comenzar.
            </p>

        </div>

    `;

});


/* ==========================================
   MODO OSCURO
========================================== */

modoOscuro.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        modoOscuro.textContent =
            "☀️ Modo claro";

    } else {

        modoOscuro.textContent =
            "🌙 Modo oscuro";

    }

});


/* ==========================================
   PERMITIR ENTER PARA ENVIAR
========================================== */

pregunta.addEventListener("keydown", function (event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        btnEnviar.click();

    }

});


/* ==========================================
   SEGURIDAD BÁSICA
========================================== */

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}
