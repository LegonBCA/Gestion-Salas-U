document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.role !== 'docente') {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nombre de usuario
    document.getElementById('username').textContent = userData.name || userData.email;

    // Inicializar componentes
    initializeModals();
    loadActiveReservations();
    loadNotifications();
    setupEventListeners();
});

// Inicialización de modales
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Configuración de event listeners
function setupEventListeners() {
    // Botón de cerrar sesión
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Botón de revisar salas
    document.getElementById('check-rooms-btn').addEventListener('click', () => {
        showAvailableRooms();
    });

    // Botón de asignar sala
    document.getElementById('assign-room-btn').addEventListener('click', () => {
        showAssignRoomModal();
    });

    // Botón de ver QR
    document.getElementById('view-qr-btn').addEventListener('click', () => {
        showQRModal();
    });

    // Botones de recursos
    document.getElementById('training-btn').addEventListener('click', showTrainingResources);
    document.getElementById('manual-btn').addEventListener('click', showUserManual);
    document.getElementById('support-btn').addEventListener('click', showSupportModal);

    // Formulario de soporte
    document.getElementById('support-form').addEventListener('submit', handleSupportRequest);
}

// Funciones para cargar datos
async function loadActiveReservations() {
    try {
        // Simulación de carga de reservas desde el backend
        const reservations = [
            {
                id: 1,
                room: 'Sala 101',
                date: '2024-03-20',
                startTime: '09:00',
                endTime: '11:00',
                subject: 'Matemáticas'
            },
            // Más reservas...
        ];

        const container = document.getElementById('active-reservations');
        container.innerHTML = '';

        reservations.forEach(reservation => {
            const card = createReservationCard(reservation);
            container.appendChild(card);
        });
    } catch (error) {
        showNotification('Error al cargar las reservas', 'error');
    }
}

function createReservationCard(reservation) {
    const card = document.createElement('div');
    card.className = 'reservation-card';
    card.innerHTML = `
        <h3>${reservation.room}</h3>
        <p><i class="fas fa-calendar"></i> ${reservation.date}</p>
        <p><i class="fas fa-clock"></i> ${reservation.startTime} - ${reservation.endTime}</p>
        <p><i class="fas fa-book"></i> ${reservation.subject}</p>
        <div class="card-actions">
            <button class="btn btn-primary" onclick="showQRForRoom('${reservation.room}')">
                <i class="fas fa-qrcode"></i> Ver QR
            </button>
            <button class="btn btn-danger" onclick="cancelReservation(${reservation.id})">
                <i class="fas fa-times"></i> Cancelar
            </button>
        </div>
    `;
    return card;
}

async function loadNotifications() {
    try {
        // Simulación de carga de notificaciones desde el backend
        const notifications = [
            {
                id: 1,
                message: 'Su reserva para la Sala 101 ha sido confirmada',
                type: 'success',
                timestamp: '2024-03-19 14:30'
            },
            // Más notificaciones...
        ];

        const container = document.getElementById('notifications-list');
        container.innerHTML = '';

        notifications.forEach(notification => {
            const element = createNotificationElement(notification);
            container.appendChild(element);
        });
    } catch (error) {
        console.error('Error al cargar notificaciones:', error);
    }
}

function createNotificationElement(notification) {
    const element = document.createElement('div');
    element.className = `notification notification-${notification.type}`;
    element.innerHTML = `
        <p class="notification-message">${notification.message}</p>
        <span class="notification-time">${notification.timestamp}</span>
    `;
    return element;
}

// Funciones para mostrar modales
function showAvailableRooms() {
    const modal = document.getElementById('available-rooms-modal');
    const roomsList = document.getElementById('rooms-list');
    
    // Simulación de carga de salas disponibles
    const rooms = [
        { id: 1, name: 'Sala 101', capacity: 30, equipment: ['Proyector', 'Pizarra Inteligente'] },
        { id: 2, name: 'Sala 102', capacity: 25, equipment: ['Proyector'] },
        // Más salas...
    ];

    roomsList.innerHTML = '';
    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room-card';
        roomElement.innerHTML = `
            <h3>${room.name}</h3>
            <p><i class="fas fa-users"></i> Capacidad: ${room.capacity}</p>
            <p><i class="fas fa-tools"></i> Equipamiento: ${room.equipment.join(', ')}</p>
            <button class="btn btn-primary" onclick="assignRoom(${room.id})">
                Reservar Sala
            </button>
        `;
        roomsList.appendChild(roomElement);
    });

    modal.style.display = 'block';
}

function showAssignRoomModal() {
    const modal = document.getElementById('assign-room-modal');
    const form = document.getElementById('room-assignment-form');

    form.innerHTML = `
        <div class="form-group">
            <label for="room-select">Sala</label>
            <select id="room-select" required>
                <option value="">Seleccione una sala</option>
                <option value="1">Sala 101</option>
                <option value="2">Sala 102</option>
            </select>
        </div>
        <div class="form-group">
            <label for="date">Fecha</label>
            <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
            <label for="start-time">Hora de inicio</label>
            <input type="time" id="start-time" required>
        </div>
        <div class="form-group">
            <label for="end-time">Hora de fin</label>
            <input type="time" id="end-time" required>
        </div>
        <div class="form-group">
            <label for="subject">Asignatura</label>
            <input type="text" id="subject" required>
        </div>
        <button type="submit" class="btn btn-primary">Confirmar Reserva</button>
    `;

    form.onsubmit = handleRoomAssignment;
    modal.style.display = 'block';
}

function showQRModal(roomId = null) {
    const modal = document.getElementById('qr-modal');
    const container = document.getElementById('qr-container');

    // Aquí se generaría el código QR real usando una biblioteca como qrcode.js
    container.innerHTML = `
        <div class="qr-code-placeholder">
            <img src="img/qr-example.png" alt="Código QR de la sala">
            <p>Escanee este código QR para registrar su asistencia</p>
        </div>
    `;

    modal.style.display = 'block';
}

// Funciones para recursos y ayuda
function showTrainingResources() {
    // Aquí se implementaría la lógica para mostrar los recursos de capacitación
    window.open('capacitaciones.html', '_blank');
}

function showUserManual() {
    // Aquí se implementaría la lógica para mostrar el manual de usuario
    window.open('manual.pdf', '_blank');
}

function showSupportModal() {
    const modal = document.getElementById('support-modal');
    modal.style.display = 'block';
}

// Funciones de manejo de eventos
async function handleRoomAssignment(event) {
    event.preventDefault();
    
    try {
        // Aquí se implementaría la lógica real para enviar la reserva al backend
        const formData = {
            roomId: document.getElementById('room-select').value,
            date: document.getElementById('date').value,
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            subject: document.getElementById('subject').value
        };

        // Simulación de respuesta exitosa
        showNotification('Reserva creada exitosamente', 'success');
        document.getElementById('assign-room-modal').style.display = 'none';
        loadActiveReservations(); // Recargar las reservas
    } catch (error) {
        showNotification('Error al crear la reserva', 'error');
    }
}

async function handleSupportRequest(event) {
    event.preventDefault();
    
    try {
        const formData = {
            type: document.getElementById('issue-type').value,
            description: document.getElementById('issue-description').value
        };

        // Aquí se implementaría la lógica real para enviar la solicitud al backend
        showNotification('Solicitud de soporte enviada exitosamente', 'success');
        document.getElementById('support-modal').style.display = 'none';
        document.getElementById('support-form').reset();
    } catch (error) {
        showNotification('Error al enviar la solicitud', 'error');
    }
}

async function cancelReservation(reservationId) {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
        try {
            // Aquí se implementaría la lógica real para cancelar la reserva en el backend
            showNotification('Reserva cancelada exitosamente', 'success');
            loadActiveReservations(); // Recargar las reservas
        } catch (error) {
            showNotification('Error al cancelar la reserva', 'error');
        }
    }
}

// Funciones de utilidad
function showNotification(message, type = 'info') {
    // Aquí se implementaría la lógica para mostrar notificaciones al usuario
    // Por ahora, usamos alert como ejemplo
    alert(message);
} 