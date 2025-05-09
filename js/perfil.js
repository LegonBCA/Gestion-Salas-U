document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Cargar información del usuario
    cargarInformacionUsuario(user);

    // Configurar el formulario
    const perfilForm = document.getElementById('perfilForm');
    perfilForm.addEventListener('submit', handlePerfilSubmit);

    // Cargar historial de reservas
    cargarHistorialReservas();
});

// Función para cargar la información del usuario
function cargarInformacionUsuario(user) {
    document.getElementById('nombre').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('telefono').value = user.phone || '';
}

// Función para manejar el envío del formulario
function handlePerfilSubmit(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = {
        name: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('telefono').value
    };

    // Actualizar la información del usuario
    actualizarInformacionUsuario(formData);
}

// Función para actualizar la información del usuario
function actualizarInformacionUsuario(formData) {
    // Obtener el usuario actual
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Actualizar los datos
    user.name = formData.name;
    user.email = formData.email;
    user.phone = formData.phone;

    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(user));

    alert('Información actualizada correctamente');
}

// Función para cambiar la contraseña
function cambiarContrasena() {
    const nuevaContrasena = prompt('Ingrese su nueva contraseña:');
    if (nuevaContrasena) {
        const confirmacion = prompt('Confirme su nueva contraseña:');
        if (nuevaContrasena === confirmacion) {
            // Aquí iría la lógica para actualizar la contraseña
            alert('Contraseña actualizada correctamente');
        } else {
            alert('Las contraseñas no coinciden');
        }
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Función para cargar el historial de reservas
function cargarHistorialReservas() {
    // Datos de prueba
    const historial = [
        {
            id: 1,
            sala: 'Sala A-101',
            fecha: '2024-03-15',
            hora: '10:00 - 12:00',
            estado: 'completado'
        },
        {
            id: 2,
            sala: 'Sala B-203',
            fecha: '2024-03-16',
            hora: '14:00 - 16:00',
            estado: 'cancelado'
        },
        {
            id: 3,
            sala: 'Sala C-305',
            fecha: '2024-03-17',
            hora: '09:00 - 11:00',
            estado: 'pendiente'
        }
    ];

    const historialGrid = document.getElementById('historialGrid');
    historialGrid.innerHTML = '';

    historial.forEach(reserva => {
        const card = createHistorialCard(reserva);
        historialGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de historial
function createHistorialCard(reserva) {
    const card = document.createElement('div');
    card.className = 'reserva-historial';

    const estadoClass = `estado-${reserva.estado}`;
    const estadoText = {
        'completado': 'Completado',
        'cancelado': 'Cancelado',
        'pendiente': 'Pendiente'
    }[reserva.estado];

    card.innerHTML = `
        <h3>${reserva.sala}</h3>
        <div class="reserva-info">
            <p><strong>Fecha:</strong> ${reserva.fecha}</p>
            <p><strong>Hora:</strong> ${reserva.hora}</p>
        </div>
        <span class="reserva-estado ${estadoClass}">${estadoText}</span>
    `;

    return card;
} 