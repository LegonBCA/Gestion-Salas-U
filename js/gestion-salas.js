document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado y es administrador
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'administrativo') {
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

    // Cargar salas
    cargarSalas();
});

// Función para cargar las salas
function cargarSalas() {
    // Datos de prueba
    const salas = [
        {
            id: 1,
            nombre: 'Sala A-101',
            capacidad: 30,
            proyector: true,
            pizarraDigital: true,
            accesibilidad: true,
            estado: 'disponible'
        },
        {
            id: 2,
            nombre: 'Sala B-203',
            capacidad: 20,
            proyector: true,
            pizarraDigital: false,
            accesibilidad: true,
            estado: 'en mantenimiento'
        }
    ];

    const salasGrid = document.getElementById('salasGrid');
    salasGrid.innerHTML = '';

    salas.forEach(sala => {
        const card = createSalaCard(sala);
        salasGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de sala
function createSalaCard(sala) {
    const card = document.createElement('div');
    card.className = 'sala-card';
    
    const estadoClass = sala.estado === 'disponible' ? 'estado-activa' : 'estado-cancelada';

    card.innerHTML = `
        <h3>${sala.nombre}</h3>
        <div class="sala-info">
            <p><strong>Capacidad:</strong> ${sala.capacidad} personas</p>
            <p><strong>Proyector:</strong> ${sala.proyector ? 'Sí' : 'No'}</p>
            <p><strong>Pizarra Digital:</strong> ${sala.pizarraDigital ? 'Sí' : 'No'}</p>
            <p><strong>Accesibilidad:</strong> ${sala.accesibilidad ? 'Sí' : 'No'}</p>
        </div>
        <div class="sala-actions">
            <span class="sala-estado ${estadoClass}">${sala.estado}</span>
            <button class="btn-secondary" onclick="editarSala(${sala.id})">Editar</button>
            <button class="btn-danger" onclick="eliminarSala(${sala.id})">Eliminar</button>
        </div>
    `;

    return card;
}

// Función para agregar una nueva sala
function agregarSala() {
    // Aquí iría la lógica para mostrar un formulario modal
    alert('Funcionalidad de agregar sala en desarrollo');
}

// Función para editar una sala
function editarSala(id) {
    // Aquí iría la lógica para editar la sala
    alert(`Editando sala ${id}`);
}

// Función para eliminar una sala
function eliminarSala(id) {
    if (confirm('¿Está seguro de que desea eliminar esta sala?')) {
        // Aquí iría la lógica para eliminar la sala
        alert(`Sala ${id} eliminada`);
        cargarSalas();
    }
} 