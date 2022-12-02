import * as AWS from "aws-sdk";
const tableName = process.env.ContentTable || "ContentTable";

const dbClient = new AWS.DynamoDB.DocumentClient();

const handler = async () => {
  try {
    const records = await dbClient
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
