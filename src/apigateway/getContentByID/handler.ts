// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { region, tableName } from "../../../config/config";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: region });

export const handler = async (event: APIGatewayEvent) => {
  const body = event.pathParameters;

  console.log(body);

  const id = body?.pk || "";
  const date = body?.sk || "";
  // const numDate = parseInt(date);

  const getParams: GetItemCommandInput = {
    TableName: tableName,
    Key: marshall({ contentId:id , datePublishedEpox: date }),
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
