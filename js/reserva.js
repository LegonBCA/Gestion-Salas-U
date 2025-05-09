document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Configurar el formulario
    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', handleReservaSubmit);

    // Configurar la fecha mínima como hoy
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;
});

// Función para manejar el envío del formulario
function handleReservaSubmit(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = {
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        duracion: document.getElementById('duracion').value,
        capacidad: document.getElementById('capacidad').value,
        proyector: document.getElementById('proyector').checked,
        pizarraDigital: document.getElementById('pizarraDigital').checked,
        accesibilidad: document.getElementById('accesibilidad').checked
    };

    // Buscar salas disponibles
    buscarSalasDisponibles(formData);
}

// Función para buscar salas disponibles
function buscarSalasDisponibles(criterios) {
    // Datos de prueba
    const salasDisponibles = [
        {
            id: 1,
            nombre: 'Sala A-101',
            capacidad: 30,
            proyector: true,
            pizarraDigital: true,
            accesibilidad: true
        },
        {
            id: 2,
            nombre: 'Sala B-203',
            capacidad: 20,
            proyector: true,
            pizarraDigital: false,
            accesibilidad: true
        },
        {
            id: 3,
            nombre: 'Sala C-305',
            capacidad: 15,
            proyector: false,
            pizarraDigital: true,
            accesibilidad: false
        }
    ];

    // Filtrar salas según los criterios
    const salasFiltradas = salasDisponibles.filter(sala => {
        return (
            sala.capacidad >= criterios.capacidad &&
            (!criterios.proyector || sala.proyector) &&
            (!criterios.pizarraDigital || sala.pizarraDigital) &&
            (!criterios.accesibilidad || sala.accesibilidad)
        );
    });

    // Mostrar resultados
    mostrarResultados(salasFiltradas, criterios);
}

// Función para mostrar los resultados
function mostrarResultados(salas, criterios) {
    const resultadosContainer = document.getElementById('resultados');
    const salasGrid = document.getElementById('salasGrid');
    
    resultadosContainer.style.display = 'block';
    salasGrid.innerHTML = '';

    if (salas.length === 0) {
        salasGrid.innerHTML = '<p class="no-results">No se encontraron salas disponibles con los criterios especificados.</p>';
        return;
    }

    salas.forEach(sala => {
        const card = createSalaCard(sala, criterios);
        salasGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de sala
function createSalaCard(sala, criterios) {
    const card = document.createElement('div');
    card.className = 'sala-card';

    const features = [];
    if (sala.proyector) features.push('Proyector');
    if (sala.pizarraDigital) features.push('Pizarra Digital');
    if (sala.accesibilidad) features.push('Accesible');

    card.innerHTML = `
        <h3>${sala.nombre}</h3>
        <div class="sala-info">
            <p><strong>Capacidad:</strong> ${sala.capacidad} personas</p>
            <p><strong>Fecha:</strong> ${criterios.fecha}</p>
            <p><strong>Hora:</strong> ${criterios.hora}</p>
            <p><strong>Duración:</strong> ${criterios.duracion} horas</p>
        </div>
        <div class="sala-features">
            ${features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>
        <button class="btn-primary" onclick="reservarSala(${sala.id}, ${JSON.stringify(criterios)})">Reservar</button>
    `;

    return card;
}

// Función para reservar una sala
function reservarSala(salaId, criterios) {
    if (confirm('¿Confirmar reserva de la sala?')) {
        // Aquí iría la lógica para guardar la reserva
        alert('Reserva realizada con éxito');
        // Generar y mostrar QR
        generarQR(salaId, criterios);
    }
}

// Función para generar QR (simulada)
function generarQR(salaId, criterios) {
    // Aquí iría la lógica real para generar el QR
    alert('QR generado para la reserva');
    // Redirigir al dashboard
    window.location.href = 'dashboard-docente.html';
} 