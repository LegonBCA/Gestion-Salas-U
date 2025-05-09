document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Cargar el progreso del usuario
    cargarProgreso();
});

// Función para cargar el progreso del usuario
function cargarProgreso() {
    // Obtener el progreso guardado o inicializar
    let progreso = JSON.parse(localStorage.getItem('progresoFormacion')) || {
        completados: [],
        total: 3 // Total de recursos disponibles
    };

    // Actualizar la barra de progreso
    const porcentaje = (progreso.completados.length / progreso.total) * 100;
    document.getElementById('progresoFill').style.width = `${porcentaje}%`;
    document.getElementById('progresoText').textContent = `${Math.round(porcentaje)}% Completado`;

    // Marcar los recursos completados
    progreso.completados.forEach(id => {
        const boton = document.querySelector(`button[onclick="marcarCompletado(${id})"]`);
        if (boton) {
            boton.disabled = true;
            boton.textContent = 'Completado';
            boton.classList.add('completado');
        }
    });
}

// Función para ver un video
function verVideo(id) {
    // Aquí iría la lógica para reproducir el video
    alert(`Reproduciendo video ${id}`);
}

// Función para descargar un PDF
function descargarPDF(id) {
    // Aquí iría la lógica para descargar el PDF
    alert(`Descargando PDF ${id}`);
}

// Función para unirse a un taller
function unirseTaller(id) {
    // Aquí iría la lógica para unirse al taller
    alert(`Uniéndose al taller ${id}`);
}

// Función para marcar un recurso como completado
function marcarCompletado(id) {
    // Obtener el progreso actual
    let progreso = JSON.parse(localStorage.getItem('progresoFormacion')) || {
        completados: [],
        total: 3
    };

    // Verificar si ya está completado
    if (!progreso.completados.includes(id)) {
        // Agregar a completados
        progreso.completados.push(id);
        localStorage.setItem('progresoFormacion', JSON.stringify(progreso));

        // Actualizar la interfaz
        const boton = document.querySelector(`button[onclick="marcarCompletado(${id})"]`);
        if (boton) {
            boton.disabled = true;
            boton.textContent = 'Completado';
            boton.classList.add('completado');
        }

        // Actualizar la barra de progreso
        const porcentaje = (progreso.completados.length / progreso.total) * 100;
        document.getElementById('progresoFill').style.width = `${porcentaje}%`;
        document.getElementById('progresoText').textContent = `${Math.round(porcentaje)}% Completado`;

        alert('Recurso marcado como completado');
    }
} 