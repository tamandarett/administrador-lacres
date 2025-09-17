document.getElementById('lacreForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // URL da sua nova implantação do Google Apps Script
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzNEaGuuffVK7oD5kcyJDEcFxWCM2k_6JrbRWkfFQ0_VwKThTqosy45F84-TbVrmyhRlg/exec';
    
    const lacre = document.getElementById('lacre').value;
    const loja = document.getElementById('loja').value;
    const operador = document.getElementById('operador').value;

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
