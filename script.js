document.getElementById('lacreForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // URL da sua implantação do Google Apps Script
    const appsScriptUrl = 'URL_DO_SEU_APPSCRIPT_AQUI'; 
    
    const lacre = document.getElementById('lacre').value;
    const confirmarLacre = document.getElementById('confirmar-lacre').value;
    const loja = document.getElementById('loja').value;
    const operador = document.getElementById('operador').value;

    // --- Validação dos campos de lacre ---
    if (lacre !== confirmarLacre) {
        alert('Os números de lacre não são iguais. Por favor, verifique.');
        return; // Impede o envio do formulário
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
            document.getElementById('lacreForm').reset();
        } else {
            alert('Erro ao enviar os dados. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Não foi possível conectar. Verifique sua internet.');
    }
});

// --- Funções para impedir copiar/colar e menu de contexto ---
document.addEventListener('DOMContentLoaded', () => {
    const lacreInput = document.getElementById('lacre');
    const confirmarLacreInput = document.getElementById('confirmar-lacre');

    const preventPaste = (e) => {
        e.preventDefault();
        alert('Copiar e colar não é permitido neste campo. Por favor, digite o número.');
    };

    // Previne colar (Ctrl+V ou menu)
    lacreInput.addEventListener('paste', preventPaste);
    confirmarLacreInput.addEventListener('paste', preventPaste);

    // Previne o menu de contexto (clique direito)
    lacreInput.addEventListener('contextmenu', (e) => e.preventDefault());
    confirmarLacreInput.addEventListener('contextmenu', (e) => e.preventDefault());
});
