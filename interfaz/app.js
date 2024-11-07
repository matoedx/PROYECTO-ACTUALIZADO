document.getElementById('formularioMensaje').addEventListener('submit', async function (e) {
    e.preventDefault();
    const mensaje = document.getElementById('mensaje').value;

    const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje })
    });

    if (response.ok) {
        document.getElementById('estado').textContent = 'Mensaje enviado';
        document.getElementById('mensaje').value = '';
    } else {
        document.getElementById('estado').textContent = 'Error al enviar el mensaje.';
    }
});
