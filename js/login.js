document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Simulación de autenticación (reemplazar con llamada real a la API)
            const response = await authenticateUser(email, password);
            
            if (response.success) {
                // Guardar datos del usuario en localStorage
                localStorage.setItem('userData', JSON.stringify({
                    id: response.user.id,
                    nombre: response.user.nombre,
                    email: response.user.email,
                    role: response.user.role,
                    token: response.token
                }));
                
                // Redireccionar según el rol
                switch(response.user.role) {
                    case 'administrativo':
                        window.location.href = 'dashboard-admin.html';
                        break;
                    case 'docente':
                        window.location.href = 'dashboard-docente.html';
                        break;
                    default:
                        window.location.href = 'dashboard-user.html';
                }
            } else {
                showError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            showError('Error al iniciar sesión. Por favor, intente nuevamente.');
        }
    });
});

// Función de autenticación simulada (reemplazar con llamada real a la API)
async function authenticateUser(email, password) {
    // Simulación de base de datos de usuarios
    const users = [
        {
            id: 1,
            nombre: 'Admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'administrativo'
        },
        {
            id: 2,
            nombre: 'Docente',
            email: 'docente@example.com',
            password: 'docente123',
            role: 'docente'
        },
        {
            id: 3,  
            nombre: 'Usuario',
            email: 'user@example.com',
            password: 'user123',
            role: 'usuario'
        }
    ];
    
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            success: true,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                role: user.role
            },
            token: 'simulated-token-' + user.id
        };
    }
    
    return {
        success: false,
        message: 'Credenciales inválidas'
    };
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
} 