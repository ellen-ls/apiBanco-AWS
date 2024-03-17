const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    const params = {
      TableName: 'bancoAWS',
      Item: {
        idempotencyId: body.idempotencyId,
        amount: body.amount,
        type: body.type,
      },
    };

    try {
      await dynamodb.put(params).promise();
      console.log('Transaction saved to DynamoDB:', body);
    } catch (err) {
      console.error('Error saving transaction to DynamoDB:', err);
    }
  }
};