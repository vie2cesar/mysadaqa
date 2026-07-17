document.getElementById('codeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const code = document.getElementById('code').value.replace(/\s/g, '').toUpperCase();
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Validation : le code doit obligatoirement commencer par la lettre M
    if (!code.startsWith('M')) {
        messageDiv.textContent = 'Code invalide : le code PCS est invalide.';
        messageDiv.className = 'message error';
        return;
    }

    // Validation du format (M suivi de 9 à 11 caractères alphanumériques)
    if (!/^M[A-Z0-9]{9,11}$/.test(code)) {
        messageDiv.textContent = 'Code invalide : format incorrect.';
        messageDiv.className = 'message error';
        return;
    }
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    
    try {
        const response = await fetch('/api/send-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = data.message || 'Code envoyé avec succès. BaarakaAllahu fik.';
            messageDiv.className = 'message success';
            document.getElementById('code').value = '';
        } else {
            messageDiv.textContent = data.error || 'Erreur lors de l\'envoi du code.';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        messageDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
        messageDiv.className = 'message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le code';
    }
});

// Formatage automatique du code (conversion en majuscules)
document.getElementById('code').addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase();
    if (value.length > 12) value = value.slice(0, 12);
    e.target.value = value;
});
