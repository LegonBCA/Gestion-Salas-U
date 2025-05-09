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

    // Cargar usuarios
    cargarUsuarios();
});

// Función para cargar los usuarios
function cargarUsuarios() {
    // Datos de prueba
    const usuarios = [
        {
            id: 1,
            nombre: 'Profesor Ejemplo',
            email: 'docente@ejemplo.com',
            rol: 'docente',
            estado: 'activo'
        },
        {
            id: 2,
            nombre: 'Administrador Ejemplo',
            email: 'admin@ejemplo.com',
            rol: 'administrativo',
            estado: 'activo'
        }
    ];

    const usuariosGrid = document.getElementById('usuariosGrid');
    usuariosGrid.innerHTML = '';

    usuarios.forEach(usuario => {
        const card = createUsuarioCard(usuario);
        usuariosGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de usuario
function createUsuarioCard(usuario) {
    const card = document.createElement('div');
    card.className = 'usuario-card';
    
    const estadoClass = usuario.estado === 'activo' ? 'estado-activa' : 'estado-cancelada';

    card.innerHTML = `
        <h3>${usuario.nombre}</h3>
        <div class="usuario-info">
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Rol:</strong> ${usuario.rol}</p>
        </div>
        <div class="usuario-actions">
            <span class="usuario-estado ${estadoClass}">${usuario.estado}</span>
            <button class="btn-secondary" onclick="editarUsuario(${usuario.id})">Editar</button>
            <button class="btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </div>
    `;

    return card;
}

// Función para agregar un nuevo usuario
function agregarUsuario() {
    // Aquí iría la lógica para mostrar un formulario modal
    alert('Funcionalidad de agregar usuario en desarrollo');
}

// Función para editar un usuario
function editarUsuario(id) {
    // Aquí iría la lógica para editar el usuario
    alert(`Editando usuario ${id}`);
}

// Función para eliminar un usuario
function eliminarUsuario(id) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        // Aquí iría la lógica para eliminar el usuario
        alert(`Usuario ${id} eliminado`);
        cargarUsuarios();
    }
} 