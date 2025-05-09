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

    // Cargar reportes existentes
    cargarReportes();
});

// Función para generar un reporte
function generarReporte(tipo) {
    // Datos de prueba
    const reporte = {
        id: Date.now(),
        tipo: tipo,
        fecha: new Date().toLocaleDateString(),
        estado: 'completado'
    };

    // Aquí iría la lógica para generar el reporte real
    alert(`Generando reporte de ${tipo}...`);
    
    // Agregar el reporte a la lista
    agregarReporte(reporte);
}

// Función para cargar los reportes existentes
function cargarReportes() {
    // Datos de prueba
    const reportes = [
        {
            id: 1,
            tipo: 'reservas',
            fecha: '2024-03-20',
            estado: 'completado'
        },
        {
            id: 2,
            tipo: 'usuarios',
            fecha: '2024-03-19',
            estado: 'completado'
        }
    ];

    const reportesGrid = document.getElementById('reportesGrid');
    reportesGrid.innerHTML = '';

    reportes.forEach(reporte => {
        const card = createReporteCard(reporte);
        reportesGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de reporte
function createReporteCard(reporte) {
    const card = document.createElement('div');
    card.className = 'reporte-card';
    
    const estadoClass = reporte.estado === 'completado' ? 'estado-activa' : 'estado-cancelada';

    card.innerHTML = `
        <h3>Reporte de ${reporte.tipo}</h3>
        <div class="reporte-info">
            <p><strong>Fecha:</strong> ${reporte.fecha}</p>
            <p><strong>Estado:</strong> ${reporte.estado}</p>
        </div>
        <div class="reporte-actions">
            <button class="btn-primary" onclick="descargarReporte(${reporte.id})">Descargar</button>
            <button class="btn-danger" onclick="eliminarReporte(${reporte.id})">Eliminar</button>
        </div>
    `;

    return card;
}

// Función para agregar un nuevo reporte
function agregarReporte(reporte) {
    const reportesGrid = document.getElementById('reportesGrid');
    const card = createReporteCard(reporte);
    reportesGrid.insertBefore(card, reportesGrid.firstChild);
}

// Función para descargar un reporte
function descargarReporte(id) {
    // Aquí iría la lógica para descargar el reporte
    alert(`Descargando reporte ${id}`);
}

// Función para eliminar un reporte
function eliminarReporte(id) {
    if (confirm('¿Está seguro de que desea eliminar este reporte?')) {
        // Aquí iría la lógica para eliminar el reporte
        alert(`Reporte ${id} eliminado`);
        cargarReportes();
    }
} 