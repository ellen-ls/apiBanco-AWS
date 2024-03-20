const express = require('express');
const { SQS } = require('aws-sdk');

const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
const sqs = new SQS({ region: 'us-east-1' });

app.post('/transacoes', async (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  const params = {
    MessageBody: JSON.stringify({ idempotencyId, amount, type }),
    QueueUrl:'https://sqs.us-east-1.amazonaws.com/905418210164/permissao',
  };

  try {
    await sqs.sendMessage(params).promise();
    res.status(200).send('Transaction sent to SQS.');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error sending transaction to SQS.');
  }
});

  // Rota GET para recuperar dados da fila SQS
app.get('/api/infoTransacoes', async (req, res) => {
  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/905418210164/permissao',
    MaxNumberOfMessages: 10, // Quantidade máxima de mensagens a serem recuperadas
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error retrieving messages from SQS.');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

