const sdk = require('aws-sdk');

const handler = async (event) => {
  console.log(JSON.stringify(event));
  const parameters = event.queryStringParameters;
  console.log(`Params: ${parameters}`);
  const tableName = process.env.ContentTable || 'ContentTable';
  const dbClient = new sdk.DynamoDB.DocumentClient();
  let body;
  if (!parameters) {
    console.log('no path');
    body = await dbClient.scan({
      TableName: tableName,
    }).promise();
  } else {
    const params = {
      KeyConditionExpression: 'contentPath = :contentPath',
      ExpressionAttributeValues: {
        ':contentPath': 'swag',
      },
      TableName: tableName,
    };
    // console.log('path given: ' + path);
    body = await dbClient.query(params, (data) => {
      console.log(data);
    }).promise();
    body = body.Items[0];
  }

  return {
    body,
    statusCode: 200,
    headers:{ 'Access-Control-Allow-Origin' : '*' },
  };
}
exports.handler = handler;