document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación y rol
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.role !== 'administrativo') {
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nombre de usuario
    document.getElementById('user-name').textContent = userData.nombre;

    // Configurar botón de logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Configurar navegación
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const sectionTitle = document.getElementById('section-title');
    const addNewBtn = document.getElementById('add-new-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Actualizar botones activos
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar sección correspondiente
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${targetSection}-section`) {
                    section.classList.add('active');
                    sectionTitle.textContent = button.textContent.trim();
                    loadSectionData(targetSection);
                    updateAddButtonText(targetSection);
                }
            });
        });
    });

    // Configurar botón de agregar
    addNewBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('.content-section.active');
        const sectionId = activeSection.id.replace('-section', '');
        showAddModal(sectionId);
    });

    // Cargar datos iniciales
    loadSectionData('reservas');
    initializeQRGenerator();
    initializeReportGenerator();

    // Configurar filtros
    setupFilters();
});

// Función para actualizar el texto del botón de agregar
function updateAddButtonText(section) {
    const addNewBtn = document.getElementById('add-new-btn');
    const texts = {
        'reservas': 'Nueva Reserva',
        'usuarios': 'Nuevo Usuario',
        'salas': 'Nueva Sala',
        'turnos': 'Nuevo Turno',
        'capacitaciones': 'Nueva Capacitación'
    };
    addNewBtn.innerHTML = `<i class="fas fa-plus"></i> ${texts[section] || 'Nuevo'}`;
    addNewBtn.style.display = ['qr', 'reportes', 'soporte'].includes(section) ? 'none' : 'flex';
}

// Función para cargar datos de cada sección
function loadSectionData(section) {
    switch (section) {
        case 'reservas':
            loadReservations();
            break;
        case 'usuarios':
            loadUsers();
            break;
        case 'salas':
            loadRooms();
            break;
        case 'turnos':
            loadSchedules();
            break;
        case 'capacitaciones':
            loadTrainings();
            break;
        case 'soporte':
            loadSupportTickets();
            break;
    }
}

// Funciones de carga de datos
function loadReservations() {
    // Datos de prueba
    const reservas = [
        {
            id: 1,
            sala: 'Sala 101',
            docente: 'Juan Pérez',
            fecha: '2024-03-20',
            hora: '10:00 - 11:00',
            estado: 'activa'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('reservas-table-body');
    tbody.innerHTML = reservas.map(reserva => `
        <tr>
            <td>${reserva.id}</td>
            <td>${reserva.sala}</td>
            <td>${reserva.docente}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.hora}</td>
            <td><span class="status-badge status-${reserva.estado}">${reserva.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="editReservation(${reserva.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteReservation(${reserva.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadUsers() {
    const usuarios = [
        {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            rol: 'docente',
            estado: 'activo'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('usuarios-table-body');
    tbody.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td><span class="status-badge status-${usuario.estado}">${usuario.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="editUser(${usuario.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteUser(${usuario.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadRooms() {
    const salas = [
        {
            id: 1,
            nombre: 'Sala 101',
            tipo: 'aula',
            capacidad: 30,
            estado: 'disponible'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('salas-table-body');
    tbody.innerHTML = salas.map(sala => `
        <tr>
            <td>${sala.id}</td>
            <td>${sala.nombre}</td>
            <td>${sala.tipo}</td>
            <td>${sala.capacidad}</td>
            <td><span class="status-badge status-${sala.estado}">${sala.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="editRoom(${sala.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteRoom(${sala.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-outline" onclick="generateQR('sala', ${sala.id})">
                    <i class="fas fa-qrcode"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadSchedules() {
    const turnos = [
        {
            id: 1,
            sala: 'Sala 101',
            dia: 'Lunes',
            horaInicio: '08:00',
            horaFin: '10:00',
            estado: 'disponible'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('turnos-table-body');
    tbody.innerHTML = turnos.map(turno => `
        <tr>
            <td>${turno.id}</td>
            <td>${turno.sala}</td>
            <td>${turno.dia}</td>
            <td>${turno.horaInicio}</td>
            <td>${turno.horaFin}</td>
            <td><span class="status-badge status-${turno.estado}">${turno.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="editSchedule(${turno.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteSchedule(${turno.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadTrainings() {
    const capacitaciones = [
        {
            id: 1,
            titulo: 'Uso de Equipos Multimedia',
            instructor: 'María González',
            fecha: '2024-03-25',
            estado: 'programada'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('capacitaciones-table-body');
    tbody.innerHTML = capacitaciones.map(capacitacion => `
        <tr>
            <td>${capacitacion.id}</td>
            <td>${capacitacion.titulo}</td>
            <td>${capacitacion.instructor}</td>
            <td>${capacitacion.fecha}</td>
            <td><span class="status-badge status-${capacitacion.estado}">${capacitacion.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="editTraining(${capacitacion.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteTraining(${capacitacion.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadSupportTickets() {
    const tickets = [
        {
            id: 1,
            usuario: 'Juan Pérez',
            asunto: 'Problema con proyector',
            fecha: '2024-03-20',
            estado: 'pendiente'
        },
        // Más datos de prueba...
    ];

    const tbody = document.getElementById('soporte-table-body');
    tbody.innerHTML = tickets.map(ticket => `
        <tr>
            <td>${ticket.id}</td>
            <td>${ticket.usuario}</td>
            <td>${ticket.asunto}</td>
            <td>${ticket.fecha}</td>
            <td><span class="status-badge status-${ticket.estado}">${ticket.estado}</span></td>
            <td>
                <button class="btn btn-outline" onclick="viewTicket(${ticket.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-outline" onclick="updateTicketStatus(${ticket.id})">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Funciones para el generador de QR
function initializeQRGenerator() {
    const qrType = document.getElementById('qr-type');
    const qrItem = document.getElementById('qr-item');
    const generateBtn = document.getElementById('generate-qr-btn');
    const downloadBtn = document.getElementById('download-qr-btn');

    qrType.addEventListener('change', () => {
        loadQRItems(qrType.value);
    });

    generateBtn.addEventListener('click', () => {
        generateQR(qrType.value, qrItem.value);
    });

    downloadBtn.addEventListener('click', downloadQR);

    // Cargar items iniciales
    loadQRItems('sala');
}

function loadQRItems(type) {
    const qrItem = document.getElementById('qr-item');
    qrItem.innerHTML = '<option value="">Seleccione un item</option>';

    // Datos de prueba según el tipo
    let items = [];
    switch (type) {
        case 'sala':
            items = [
                { id: 1, nombre: 'Sala 101' },
                { id: 2, nombre: 'Sala 102' }
            ];
            break;
        case 'reserva':
            items = [
                { id: 1, nombre: 'Reserva #001' },
                { id: 2, nombre: 'Reserva #002' }
            ];
            break;
        case 'usuario':
            items = [
                { id: 1, nombre: 'Juan Pérez' },
                { id: 2, nombre: 'María González' }
            ];
            break;
    }

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nombre;
        qrItem.appendChild(option);
    });
}

function generateQR(type, id) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = '';

    if (!type || !id) {
        alert('Por favor seleccione el tipo y el item');
        return;
    }

    // Generar datos para el QR
    const data = {
        type: type,
        id: id,
        timestamp: new Date().toISOString()
    };

    // Crear QR
    const qr = qrcode(0, 'M');
    qr.addData(JSON.stringify(data));
    qr.make();

    qrContainer.innerHTML = qr.createImgTag(5);
}

function downloadQR() {
    const qrImage = document.querySelector('#qr-code img');
    if (!qrImage) {
        alert('Primero debe generar un código QR');
        return;
    }

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrImage.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Funciones para el generador de reportes
function initializeReportGenerator() {
    const generateBtn = document.getElementById('generate-report-btn');
    generateBtn.addEventListener('click', generateReport);
}

function generateReport() {
    const type = document.getElementById('report-type').value;
    const period = document.getElementById('report-period').value;

    // Aquí iría la lógica para generar el reporte
    console.log('Generando reporte:', { type, period });
    alert('Reporte generado exitosamente');
}

// Funciones de gestión (CRUD)
function showAddModal(type) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = createModalContent(type, 'add');
    
    modalContainer.innerHTML = modalContent;
    modalContainer.classList.add('active');

    // Configurar evento de cierre
    const closeBtn = modalContainer.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modalContainer.classList.remove('active');
    });

    // Configurar formulario
    const form = modalContainer.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(type, 'add', null, form);
    });
}

function createModalContent(type, action, data = null) {
    const title = action === 'add' ? `Nuevo ${type}` : `Editar ${type}`;
    const formFields = getFormFields(type, data);

    return `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="btn btn-outline modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="modal-body">
                ${formFields}
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline modal-close">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </div>
    `;
}

function getFormFields(type, data = null) {
    // Retornar campos según el tipo
    switch (type) {
        case 'usuarios':
            return `
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" required value="${data?.nombre || ''}">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required value="${data?.email || ''}">
                </div>
                <div class="form-group">
                    <label>Rol</label>
                    <select name="rol" required>
                        <option value="docente" ${data?.rol === 'docente' ? 'selected' : ''}>Docente</option>
                        <option value="administrativo" ${data?.rol === 'administrativo' ? 'selected' : ''}>Administrativo</option>
                    </select>
                </div>
            `;
        case 'salas':
            return `
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" required value="${data?.nombre || ''}">
                </div>
                <div class="form-group">
                    <label>Tipo</label>
                    <select name="tipo" required>
                        <option value="aula" ${data?.tipo === 'aula' ? 'selected' : ''}>Aula</option>
                        <option value="laboratorio" ${data?.tipo === 'laboratorio' ? 'selected' : ''}>Laboratorio</option>
                        <option value="auditorio" ${data?.tipo === 'auditorio' ? 'selected' : ''}>Auditorio</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Capacidad</label>
                    <input type="number" name="capacidad" required value="${data?.capacidad || ''}">
                </div>
            `;
        // Agregar más casos según sea necesario
        default:
            return '';
    }
}

function handleFormSubmit(type, action, id, form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Aquí iría la lógica para enviar los datos al backend
    console.log('Enviando datos:', { type, action, id, data });

    // Simular éxito
    alert('Operación realizada con éxito');
    document.getElementById('modal-container').classList.remove('active');
    loadSectionData(type);
}

// Configuración de filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filters .btn');
    const searchInputs = document.querySelectorAll('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.content-section').id.replace('-section', '');
            applyFilters(section);
        });
    });

    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            const section = input.closest('.content-section').id.replace('-section', '');
            applyFilters(section);
        }, 300));
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            const section = select.closest('.content-section').id.replace('-section', '');
            applyFilters(section);
        });
    });
}

function applyFilters(section) {
    const container = document.getElementById(`${section}-section`);
    const searchValue = container.querySelector('.search-input').value.toLowerCase();
    const filterValue = container.querySelector('.filter-select').value;
    const rows = container.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.querySelector('.status-badge')?.textContent.toLowerCase();
        
        const matchesSearch = text.includes(searchValue);
        const matchesFilter = !filterValue || (status && status === filterValue);

        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
}

// Utilidad para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 