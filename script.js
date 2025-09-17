document.getElementById('lacreForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // SUBSTITUA ESTA URL PELA SUA URL DE IMPLANTAÇÃO DO GOOGLE APPS SCRIPT
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbxCcxzRKHnbCvPa4K1I4J-3k75V7u3IqjJgmO1UdAEWKWKaa-oDuxbqqOONNKzs3gxC/exec';
    
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
