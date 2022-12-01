const sdk = require('aws-sdk');
const dbClient = new sdk.DynamoDB.DocumentClient();
const tableName = process.env.ContentTable || "ContentTable";

const handler = async (event) => {

  const body = JSON.parse(event.body)
  console.log(body);
  
  const params = {
    TableName: tableName,
    Key: { contentId : body.contentId, datePublishedEpox: body.datePublishedEpox},
  };
  
  
  try {
    const result =  await dbClient.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
}
exports.handler = handler;