const sdk = require('aws-sdk');

const handler = async (event, context) => {
  console.log('deleteContentCalled');
  console.log(event, context);
  // const obj = event.headline ? event : JSON.parse(event.body);
  // console.log(`obj:${JSON.stringify(obj)}`);
  // if (!obj.path || !obj.headline) return {
  //   body: `Invalid content for PUT request. Received obj: ${JSON.stringify(obj)}`,
  //   statusCode: 400, // Could tidy and use 422 once parsed?
  // };
  // const tableName = process.env.ContentTable || 'ContentTable';
  // const dbClient = new sdk.DynamoDB.DocumentClient();
  // const result = await dbClient.put({
  //   TableName: tableName,
  //   Item: {
  //     path: obj.path,
  //     datePublishedEpox: Date.now(),
  //     headline: obj.headline || 'New article',
  //     section: obj.section || 'no section',
  //     body: obj.body || 'This is my body content',
  //   }
  // }).promise();
  // console.log('event' + JSON.stringify(event));
  // console.log('context' + JSON.stringify(context));
  // console.log('env' + JSON.stringify(process.env));
  // return {
  //   body: JSON.stringify([
  //     {
  //       response: 'Entered new record',
  //     },
  //   ]),
  //   statusCode: 200,
  //   headers:{ 'Access-Control-Allow-Origin' : '*' },
  // };
}
exports.handler = handler;