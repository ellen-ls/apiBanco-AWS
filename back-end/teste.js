const axios = require('axios');

async function createTransactions() {
  const baseURL = 'https://localhost:3000'; // Altere para o URL correto da sua API
  const transactions = [];

  for (let i = 0; i < 100; i++) {
    const transaction = {
      idempotencyId: `id${i}`,
      amount: Math.floor(Math.random() * 1000) + 1,
      type: i % 2 === 0 ? 'credit' : 'debit',
    };

    transactions.push(transaction);
  }

  try {
    for (const transaction of transactions) {
      await axios.post(`${baseURL}/transacoes`, transaction);
    }
    console.log('Transactions created successfully.');
  } catch (err) {
    console.error('Error creating transactions:', err);
  }
}

createTransactions();