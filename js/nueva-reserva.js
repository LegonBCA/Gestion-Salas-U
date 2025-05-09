document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.token) {
        window.location.href = 'login.html';
        return;
    }

    // Inicializar elementos del formulario
    const form = document.getElementById('reservationForm');
    const roomSelect = document.getElementById('sala');
    const dateInput = document.getElementById('fecha');
    const startTimeInput = document.getElementById('hora_inicio');
    const endTimeInput = document.getElementById('hora_fin');
    const subjectInput = document.getElementById('materia');
    const groupInput = document.getElementById('grupo');
    const notesInput = document.getElementById('notas');
    const cancelButton = document.getElementById('cancelButton');

    // Configurar fecha mínima (hoy) y máxima (30 días después)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Cargar salas disponibles (simulado)
    const salas = [
        { id: 1, nombre: 'Sala 101 - Capacidad: 30 personas' },
        { id: 2, nombre: 'Sala 102 - Capacidad: 25 personas' },
        { id: 3, nombre: 'Sala 201 - Capacidad: 40 personas' },
        { id: 4, nombre: 'Sala 202 - Capacidad: 35 personas' },
        { id: 5, nombre: 'Laboratorio 301 - Capacidad: 20 personas' }
    ];

    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = sala.nombre;
        roomSelect.appendChild(option);
    });

    // Validar horarios
    function validateTimes() {
        const start = startTimeInput.value;
        const end = endTimeInput.value;
        
        if (start && end && start >= end) {
            endTimeInput.setCustomValidity('La hora de fin debe ser posterior a la hora de inicio');
            return false;
        }
        
        endTimeInput.setCustomValidity('');
        return true;
    }

    startTimeInput.addEventListener('change', validateTimes);
    endTimeInput.addEventListener('change', validateTimes);

    // Manejar envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateTimes()) {
            return;
        }

        const reservationData = {
            salaId: roomSelect.value,
            fecha: dateInput.value,
            horaInicio: startTimeInput.value,
            horaFin: endTimeInput.value,
            materia: subjectInput.value,
            grupo: groupInput.value,
            notas: notesInput.value,
            usuarioId: userData.id
        };

        try {
            // Simular envío de datos
            console.log('Datos de la reserva:', reservationData);
            
            // Aquí iría la llamada al backend
            // const response = await fetch('/api/reservas', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${userData.token}`
            //     },
            //     body: JSON.stringify(reservationData)
            // });
            
            // Simulamos una respuesta exitosa
            alert('Reserva creada exitosamente');
            
            // Redirigir según el rol del usuario
            if (userData.role === 'administrativo') {
                window.location.href = 'dashboard-admin.html';
            } else {
                window.location.href = 'dashboard-docente.html';
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Error al crear la reserva. Por favor, intente nuevamente.');
        }
    });

    // Manejar botón de cancelar
    cancelButton.addEventListener('click', function() {
        const confirmCancel = confirm('¿Está seguro que desea cancelar la reserva? Los datos no guardados se perderán.');
        if (confirmCancel) {
            // Redirigir según el rol del usuario
            if (userData.role === 'administrativo') {
                window.location.href = 'dashboard-admin.html';
            } else {
                window.location.href = 'dashboard-docente.html';
            }
        }
    });

    // Validar disponibilidad de la sala (simulado)
    async function checkRoomAvailability() {
        if (!roomSelect.value || !dateInput.value || !startTimeInput.value || !endTimeInput.value) {
            return;
        }

        // Aquí iría la llamada al backend para verificar disponibilidad
        // Simulamos una verificación
        const isAvailable = Math.random() > 0.3; // 70% de probabilidad de que esté disponible
        
        if (!isAvailable) {
            alert('La sala seleccionada no está disponible en el horario especificado. Por favor, seleccione otro horario u otra sala.');
        }
    }

    // Eventos para verificar disponibilidad
    roomSelect.addEventListener('change', checkRoomAvailability);
    dateInput.addEventListener('change', checkRoomAvailability);
    startTimeInput.addEventListener('change', checkRoomAvailability);
    endTimeInput.addEventListener('change', checkRoomAvailability);
}); 