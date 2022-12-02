const sdk = require("aws-sdk");
const dbClient = new sdk.DynamoDB.DocumentClient();

const handler = async () => {

  const tableName = process.env.ContentTable || "ContentTable";

  try {
   const records =  await dbClient
      .scan({
        TableName: tableName,
      })
      .promise();

    return {
      body: JSON.stringify(records),
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
exports.handler = handler;
