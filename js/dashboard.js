document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Mostrar nombre del usuario
    document.getElementById('userName').textContent = user.name;

    // Configurar botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    // Cargar reservas activas
    loadReservasActivas();
});

// Función para cargar las reservas activas
function loadReservasActivas() {
    // Datos de prueba
    const reservas = [
        {
            id: 1,
            sala: 'Sala A-101',
            fecha: '2024-03-20',
            hora: '10:00 - 12:00',
            capacidad: 30,
            proyector: true,
            pizarraDigital: true,
            accesibilidad: true
        },
        {
            id: 2,
            sala: 'Sala B-203',
            fecha: '2024-03-21',
            hora: '14:00 - 16:00',
            capacidad: 20,
            proyector: true,
            pizarraDigital: false,
            accesibilidad: true
        }
    ];

    const reservasGrid = document.getElementById('reservasGrid');
    reservasGrid.innerHTML = '';

    reservas.forEach(reserva => {
        const card = createReservaCard(reserva);
        reservasGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de reserva
function createReservaCard(reserva) {
    const card = document.createElement('div');
    card.className = 'reserva-card';
    
    const features = [];
    if (reserva.proyector) features.push('Proyector');
    if (reserva.pizarraDigital) features.push('Pizarra Digital');
    if (reserva.accesibilidad) features.push('Accesible');

    card.innerHTML = `
        <h3>${reserva.sala}</h3>
        <div class="reserva-info">
            <p><strong>Fecha:</strong> ${reserva.fecha}</p>
            <p><strong>Hora:</strong> ${reserva.hora}</p>
            <p><strong>Capacidad:</strong> ${reserva.capacidad} personas</p>
            <p><strong>Características:</strong> ${features.join(', ')}</p>
        </div>
        <div class="reserva-actions">
            <button class="btn-primary" onclick="viewQR(${reserva.id})">Ver QR</button>
            <button class="btn-secondary" onclick="cancelReserva(${reserva.id})">Cancelar</button>
        </div>
    `;

    return card;
}

// Función para ver el QR de una reserva
function viewQR(reservaId) {
    // Aquí iría la lógica para mostrar el QR
    alert(`Mostrando QR para la reserva ${reservaId}`);
}

// Función para cancelar una reserva
function cancelReserva(reservaId) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        // Aquí iría la lógica para cancelar la reserva
        alert(`Reserva ${reservaId} cancelada`);
        loadReservasActivas(); // Recargar las reservas
    }
} 