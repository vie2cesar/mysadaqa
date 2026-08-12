document.getElementById('codeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = document.getElementById('code').value.replace(/\s/g, '').toUpperCase();
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // ==============================
    // LIMITE DE 2 ENVOIS PAR SESSION
    // ==============================
    let sendCount = parseInt(sessionStorage.getItem('codeSendCount') || '0', 10);

    if (sendCount >= 2) {
        messageDiv.textContent = 'Vous avez atteint la limite de 2 envois pour cette session.';
        messageDiv.className = 'message error';
        return;
    }

    // ==============================
    // VALIDATION DU CODE
    // Exactement 16 chiffres
    // et commence par 0
    // ==============================
    if (!/^0[0-9]{15}$/.test(code)) {
        messageDiv.textContent = 'Code invalide : le code doit contenir exactement 16 chiffres et commencer par 0.';
        messageDiv.className = 'message error';
        return;
    }

    // ==============================
    // DÉSACTIVER LE BOUTON PENDANT L'ENVOI
    // ==============================
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

            // Compter uniquement les envois réussis
            sendCount++;
            sessionStorage.setItem('codeSendCount', sendCount);

            messageDiv.textContent = data.message || 'Code envoyé avec succès. BaarakaAllahu fik.';
            messageDiv.className = 'message success';

            // Vider le champ
            document.getElementById('code').value = '';

            // Après le 2e envoi, bloquer définitivement le bouton
            if (sendCount >= 2) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Limite atteinte';
            }

        } else {
            messageDiv.textContent = data.error || 'Erreur lors de l\'envoi du code.';
            messageDiv.className = 'message error';
        }

    } catch (error) {

        messageDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
        messageDiv.className = 'message error';

    } finally {

        // Réactiver le bouton uniquement si la limite n'est pas atteinte
        if (sendCount < 2) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le code';
        }
    }
});


// ==============================
// FORMATAGE AUTOMATIQUE DU CODE
// ==============================
document.getElementById('code').addEventListener('input', function(e) {

    let value = e.target.value.replace(/\D/g, '');

    // Force le premier caractère à être 0
    if (value.length > 0 && value[0] !== '0') {
        value = '0' + value;
    }

    // Maximum 16 chiffres
    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    e.target.value = value;
});
