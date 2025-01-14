// Configuración del contador
const targetDate = new Date("2025-03-29T17:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById("countdown").innerText = "¡El gran día ha llegado!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

   // document.getElementById("countdown").innerText = 
   //     `${days} días, ${hours} hrs, ${minutes} min, ${seconds} seg`;

   document.getElementById("countdown").innerHTML = `
    <table>
        <tr>
            <td class="value kurale-regular" >${days}</td>
            <td class="value kurale-regular" >${hours}</td>
            <td class="value kurale-regular" >${minutes}</td>
            <td class="value kurale-regular" >${seconds}</td>
        </tr>
        <tr>
            <td class="label kurale-regular">Días</td>
            <td class="label kurale-regular">Hrs</td>
            <td class="label kurale-regular">Min</td>
            <td class="label kurale-regular">Seg</td>
        </tr>
    </table>
`;


}




// Obtén el formulario por su ID
const formulario = document.getElementById('rsvp-form');

// Agrega un event listener para el evento 'submit'
formulario.addEventListener('submit', async (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();

    // Obtén los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const invitados = document.getElementById('invitados').value;

    const selectedRadio = document.querySelector('input[name="asistencia"]:checked');

        if (!selectedRadio) {
            event.preventDefault(); // Evitar el envío del formulario
        } else {
            const selectedValue = selectedRadio.value; // Captura el valor del radio button seleccionado
            if (selectedValue === 'si') {
                mensaje = "¡Muchas gracias por confirmar!";
                asiste ="SI";
            } else if (selectedValue === 'no') {
                mensaje = "Sentimos mucho que no puedas acompañarnos";
                asiste ="NO";
            }
        }

        document.getElementById("confirmacion").innerHTML = `<p id="confirmacion" style="font-size:15px">${mensaje}</p>`;



    // Llama a la función asincrónica y pasa los valores
    await sendConfirmation(nombre, invitados, asiste);
});


function abrirEnMapaIglesia() {
    // Acción a realizar al hacer clic
    window.location.href = "https://maps.app.goo.gl/PeMrcLwrrA4ZZrQS6";
}

function abrirEnMapaSalon() {
    // Acción a realizar al hacer clic
    window.location.href = "https://www.google.com/maps/place/Recepciones+Tirol,+Av+Ju%C3%A1rez+2,+Ocotl%C3%A1n,+90100+Tlaxcala+de+Xicoht%C3%A9ncatl,+Tlax./@19.3130181,-98.2274666,17z/data=!4m6!3m5!1s0x85cfd937aa6b6aaf:0x1a1dafd3977817a6!8m2!3d19.3130286!4d-98.2284931!16s%2Fg%2F11b7kdszgh";
}





async function sendConfirmation(nombre, invitados, asiste) {
    try {
        console.log("sss")
        // Crear los parámetros codificados en formato form-urlencoded
        const params = new URLSearchParams();
        params.append("text", "NOMBRE : " + nombre + "\nINVITADOS : " + invitados+ "\nASISTIRÁ : " + asiste);
        
        params.append("chat_id", "-4644080540");
      


             // Realizar la solicitud POST
            const response = await fetch("https://api.telegram.org/bot7688017479:AAGMTNELzCxa027y8sJ5N3llUc0hF4rQ4BU/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(), // Convertir los parámetros a un string form-encoded
        });

        console.log("repsonseOK:", response.ok);
        if (!response.ok) {
            throw new Error(`UU Error al obtener el token: ${response.statusText}`);
        }
        
        const data = await response.json(); // Si el servidor devuelve JSON




    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}




// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();
