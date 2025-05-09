document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Inicializar el escáner QR
    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
    );

    // Función para manejar el escaneo exitoso
    function onScanSuccess(decodedText, decodedResult) {
        // Detener el escáner
        html5QrcodeScanner.clear();
        
        try {
            // Parsear los datos del QR
            const reservaData = JSON.parse(decodedText);
            
            // Mostrar la información de la reserva
            mostrarInformacionReserva(reservaData);
        } catch (error) {
            console.error('Error al procesar el código QR:', error);
            alert('Código QR inválido');
        }
    }

    // Función para manejar errores de escaneo
    function onScanFailure(error) {
        console.warn(`Error al escanear: ${error}`);
    }

    // Iniciar el escáner
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Configurar el botón de marcar ingreso
    const marcarIngresoBtn = document.getElementById('marcarIngresoBtn');
    marcarIngresoBtn.addEventListener('click', marcarIngreso);
});

// Función para mostrar la información de la reserva
function mostrarInformacionReserva(reservaData) {
    const resultadoContainer = document.getElementById('resultado');
    const marcarIngresoBtn = document.getElementById('marcarIngresoBtn');

    // Actualizar la información en la interfaz
    document.getElementById('salaNombre').textContent = reservaData.sala;
    document.getElementById('reservaFecha').textContent = reservaData.fecha;
    document.getElementById('reservaHora').textContent = reservaData.hora;
    document.getElementById('usuarioNombre').textContent = reservaData.usuario;
    document.getElementById('reservaEstado').textContent = reservaData.estado;

    // Mostrar el contenedor de resultados
    resultadoContainer.style.display = 'block';

    // Mostrar u ocultar el botón según el estado
    if (reservaData.estado === 'Pendiente') {
        marcarIngresoBtn.style.display = 'block';
    } else {
        marcarIngresoBtn.style.display = 'none';
    }
}

// Función para marcar el ingreso
function marcarIngreso() {
    if (confirm('¿Confirmar ingreso a la sala?')) {
        // Aquí iría la lógica para actualizar el estado de la reserva
        alert('Ingreso registrado correctamente');
        
        // Actualizar el estado en la interfaz
        document.getElementById('reservaEstado').textContent = 'Ingresado';
        document.getElementById('marcarIngresoBtn').style.display = 'none';
    }
} 