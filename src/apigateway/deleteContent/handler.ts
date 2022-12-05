// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
const tableName = process.env.ContentTable || "ContentTable";
import { DynamoDB, DeleteItemCommand, DeleteItemCommandInput, DeleteItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: "us-east-2" });

export const handler = async (event: APIGatewayEvent) => {
  const body = event.pathParameters;

  console.log(body);

  const id = body?.contentId || "";
  const date = body?.date || "";
  const numDate = parseInt(date);

  const getParams: DeleteItemCommandInput = {
    TableName: tableName,
    Key: marshall({ contentId:id , datePublishedEpox: numDate }),
  };

  const response = new DeleteItemCommand(getParams)

  try {
    const result = await ddbClient.send(response);
    return { statusCode: 200, body: `deleted: ${JSON.stringify(result)}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  };
};
