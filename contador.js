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
            <td class="value">${days}</td>
            <td class="value">${hours}</td>
            <td class="value">${minutes}</td>
            <td class="value">${seconds}</td>
        </tr>
        <tr>
            <td class="label">Días</td>
            <td class="label">hrs</td>
            <td class="label">min</td>
            <td class="label">seg</td>
        </tr>
    </table>
`;


}

// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();
