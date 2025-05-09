document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.getElementById('recovery-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    recoveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Ocultar mensajes anteriores
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Obtener datos del formulario
        const email = document.getElementById('email').value;
        const reason = document.getElementById('reason').value;
        const temporaryPassword = document.getElementById('temporary-password').value;

        try {
            // Validar email institucional
            if (!email.endsWith('@institucion.edu')) {
                throw new Error('Por favor, ingresa un correo institucional válido');
            }

            // Aquí iría la lógica para enviar la solicitud al administrador
            // Por ahora simulamos una respuesta exitosa
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mostrar mensaje de éxito
            successMessage.textContent = 'Tu solicitud ha sido enviada al administrador. Te contactaremos pronto.';
            successMessage.style.display = 'block';

            // Limpiar el formulario
            recoveryForm.reset();

            // Redirigir después de 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            // Mostrar mensaje de error
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    });

    // Validación en tiempo real del email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
        if (emailInput.value && !emailInput.value.endsWith('@institucion.edu')) {
            emailInput.setCustomValidity('Por favor, ingresa un correo institucional válido');
        } else {
            emailInput.setCustomValidity('');
        }
    });
}); 