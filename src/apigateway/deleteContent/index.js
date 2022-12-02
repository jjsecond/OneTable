const sdk = require('aws-sdk');
const dbClient = new sdk.DynamoDB.DocumentClient();
const tableName = process.env.ContentTable || "ContentTable";

const handler = async (event) => {

   const body = event.pathParameters;

   console.log(body)
 
  const id = body.contentId
  const date = body.date
  const numDate = parseInt(date);

  
  const params = {
    TableName: tableName,
    Key: { contentId : id, datePublishedEpox: numDate},
  };
  

  try {
    const result = await dbClient.delete(params).promise();
    return { statusCode: 200, body: `deleted ${JSON.stringify(result)}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }

};
exports.handler = handler;