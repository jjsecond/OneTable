import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
const tableName = process.env.ContentTable || "ContentTable";

const dbClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent) => {
  const body = event.pathParameters;

  console.log(body);

  const id = body?.contentId;
  const date = body?.date || "";
  const numDate = parseInt(date);

  const params = {
    TableName: tableName,
    Key: { contentId: id, datePublishedEpox: numDate },
  };

  try {
    const result = await dbClient.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
