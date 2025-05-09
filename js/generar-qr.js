document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación y rol
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.role !== 'administrativo') {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nombre de usuario
    document.getElementById('user-name').textContent = userData.nombre;

    // Configurar botón de logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Ocultar resultado QR inicialmente
    document.getElementById('qr-result').style.display = 'none';

    // Configurar botón de generar QR
    document.getElementById('generar-qr-btn').addEventListener('click', generarQR);

    // Configurar botones de acción
    document.getElementById('descargar-qr').addEventListener('click', descargarQR);
    document.getElementById('imprimir-qr').addEventListener('click', imprimirQR);
});

function generarQR() {
    const sala = document.getElementById('sala').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const duracion = document.getElementById('duracion').value;

    // Validar campos
    if (!sala || !fecha || !hora || !duracion) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Obtener nombre de la sala
    const salaNombre = document.getElementById('sala').options[document.getElementById('sala').selectedIndex].text;

    // Crear objeto con la información
    const qrData = {
        sala: sala,
        salaNombre: salaNombre,
        fecha: fecha,
        hora: hora,
        duracion: duracion,
        timestamp: new Date().getTime()
    };

    // Convertir a JSON
    const qrString = JSON.stringify(qrData);

    // Generar QR
    QRCode.toCanvas(document.getElementById('qr-code'), qrString, {
        width: 200,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error(error);
            alert('Error al generar el código QR');
            return;
        }

        // Mostrar información
        document.getElementById('qr-sala').textContent = `Sala: ${salaNombre}`;
        document.getElementById('qr-fecha').textContent = `Fecha: ${fecha}`;
        document.getElementById('qr-hora').textContent = `Hora: ${hora}`;
        document.getElementById('qr-duracion').textContent = `Duración: ${duracion} horas`;

        // Mostrar resultado
        document.getElementById('qr-result').style.display = 'block';
    });
}

function descargarQR() {
    const canvas = document.querySelector('#qr-code canvas');
    const link = document.createElement('a');
    link.download = 'codigo-qr.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function imprimirQR() {
    const printWindow = window.open('', '_blank');
    const qrCode = document.getElementById('qr-code').innerHTML;
    const qrInfo = document.querySelector('.qr-info').innerHTML;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Imprimir Código QR</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                }
                .qr-container {
                    margin: 20px;
                }
                .qr-info {
                    margin-top: 20px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="qr-container">
                ${qrCode}
            </div>
            <div class="qr-info">
                ${qrInfo}
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
} 