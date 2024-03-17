const axios = require('axios');
const https = require('https');

// URL da API para onde as transações serão enviadas
const url = 'http://localhost:3001/transacoes';

// Função para gerar uma transação aleatória
function gerarTransacao() {
    return {
        id: Math.floor(Math.random() * 1000) + 1, // ID da transação (exemplo)
        valor: (Math.random() * (1000 - 10) + 10).toFixed(2), // Valor da transação (exemplo)
        descricao: `Transação ${Math.floor(Math.random() * 100) + 1}` // Descrição da transação (exemplo)
    };
}

// Array para armazenar as transações
const transacoes = [];

// Gerar 100 transações aleatórias
for (let i = 0; i < 100; i++) {
    const transacao = gerarTransacao();
    transacoes.push(transacao);
}

// Enviar as transações via POST para a API
async function enviarTransacoes() {
    const agent = new https.Agent({  
        rejectUnauthorized: false,
        secureProtocol: 'TLSv1_2_method'  // Definindo a versão do protocolo SSL/TLS
    });

    for (const transacao of transacoes) {
        try {
            const response = await axios.post(url, transacao, {
                headers: {
                    'Content-Type': 'application/json'
                },
                httpsAgent: agent  // Usando o agente HTTPS personalizado
            });
            console.log(`Transação enviada com sucesso: ${JSON.stringify(transacao)}`);
        } catch (error) {
            console.error(`Erro ao enviar transação: ${error.message}`);
        }
    }
}

enviarTransacoes();