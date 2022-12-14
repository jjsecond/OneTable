// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, DeleteItemCommand, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { region, tableName } from "../../../config/config";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: region });

export const handler = async (event: APIGatewayEvent) => {
  const body = event.pathParameters;

  console.log(body);

  const id = body?.pk || "";
  const date = body?.sk || "";
  // const numDate = parseInt(date);

  const getParams: DeleteItemCommandInput = {
    TableName: tableName,
    Key: marshall({ contentId:id , datePublishedEpox: date }),
  };

  const response = new DeleteItemCommand(getParams)

  try {
    const result = await ddbClient.send(response);
    return { statusCode: 200, body: `deleted: ${JSON.stringify(result)}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  };
};
