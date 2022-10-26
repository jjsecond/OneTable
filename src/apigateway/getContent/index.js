const sdk = require('aws-sdk');

const handler = async (event) => {
  console.log(JSON.stringify(event));
  const params = event.queryStringParameters;
  console.log(`Params: ${params}`);
  const tableName = process.env.ContentTable || 'ContentTable';
  const dbClient = new sdk.DynamoDB.DocumentClient();
  let body;
  if (!params) {
    console.log('no path');
    body = await dbClient.scan({
      TableName: tableName,
    }).promise();
  } else {
    // console.log('path given: ' + path);
    body = await dbClient.get({
      Key: {
        path: 'swag',
      },
      TableName: tableName,
    }

    ).promise();
  }

  return {
    body: JSON.stringify([
      {
        response: body,
      },
    ]),
    statusCode: 200,
    headers:{ 'Access-Control-Allow-Origin' : '*' },
  };
}
exports.handler = handler;