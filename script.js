document.addEventListener('DOMContentLoaded', () => {
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzNEaGuuffVK7oD5kcyJDEcFxWCM2k_6JrbRWkfFQ0_VwKThTqosy45F84-TbVrmyhRlg/exec';

    const lacreInput = document.getElementById('lacre');
    const confirmarLacreInput = document.getElementById('confirmar-lacre');
    const form = document.getElementById('lacreForm');

    // Funções para impedir copiar/colar e menu de contexto
    const preventPaste = (e) => {
        e.preventDefault();
        alert('Copiar e colar não é permitido neste campo. Por favor, digite o número.');
    };

    lacreInput.addEventListener('paste', preventPaste);
    confirmarLacreInput.addEventListener('paste', preventPaste);
    lacreInput.addEventListener('contextmenu', (e) => e.preventDefault());
    confirmarLacreInput.addEventListener('contextmenu', (e) => e.preventDefault());

    // Evento de envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lacre = lacreInput.value;
        const confirmarLacre = confirmarLacreInput.value;
        const loja = document.getElementById('loja').value;
        const operador = document.getElementById('operador').value;

        // Validação dos campos de lacre
        if (lacre !== confirmarLacre) {
            alert('Os números de lacre não são iguais. Por favor, verifique.');
            return;
        }

        const dataHora = new Date().toISOString();

        const dados = {
            lacre: lacre,
            loja: loja,
            operador: operador,
            dataHora: dataHora
        };

        try {
            const response = await fetch(appsScriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert('Dados enviados com sucesso!');
                form.reset();
            } else {
                alert('Erro ao enviar os dados. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar. Verifique sua internet.');
        }
    });
});
