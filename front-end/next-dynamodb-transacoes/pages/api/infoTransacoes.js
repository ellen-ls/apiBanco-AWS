// import AWS from 'aws-sdk';

// export default async function handler(req, res) {
//   const sqs = new AWS.SQS({ region: 'us-east-1' });

//   const params = {
//     QueueUrl: 'https://sqs.us-east-1.amazonaws.com/905418210164/permissao',
//     MaxNumberOfMessages: 10,
//   };

//   try {
//     const data = await sqs.receiveMessage(params).promise();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).send('Error retrieving messages from SQS.');
//   }
// }

import AWS from 'aws-sdk';


export default async function handler(req, res) {
  const sqs = new AWS.SQS({ region: 'us-east-1' });

  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/905418210164/permissao',
    MaxNumberOfMessages: 100,
    AttributeNames: ['All'],
  };

  try {
    const data = await sqs.receiveMessage(params).promise();

    console.log('Response from SQS:', data); // Adicione este console.log para ver a resposta do SQS no CloudWatch

    if (data.Messages && Array.isArray(data.Messages)) {
      const messages = data.Messages.map(message => ({
        messageId: message.MessageId,
        body: JSON.parse(message.Body),
        attributes: message.MessageAttributes,
      }));
      res.status(200).json({ messages });
    } else {
      res.status(200).json({ messages: [] }); // Retorna um array vazio se não houver mensagens
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error retrieving messages from SQS.');
  }
}
