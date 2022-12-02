// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
const tableName = process.env.ContentTable || "ContentTable";
import { DynamoDB, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: "us-east-2" });

export const handler = async (event: APIGatewayEvent) => {
  const body = event.pathParameters;

  console.log(body);

  const id = body?.contentId || "";
  const date = body?.date || "";
  const numDate = parseInt(date);

  const getParams: GetItemCommandInput = {
    TableName: tableName,
    Key: marshall({ contentId:id , datePublishedEpox: numDate }),
  };

  const response = new GetItemCommand(getParams)

  try {
    const result = await ddbClient.send(response);
    if(result.Item){
      const response = unmarshall(result.Item)
    return { statusCode: 200, body: JSON.stringify(response) };
    }
    return { statusCode: 500, body:' Something went wrong....' };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
