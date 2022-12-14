// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { region, tableName } from "../../../config/config";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: region });


export const handler = async (event: APIGatewayEvent) => {
  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }

  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      contentId: article.pk,
      datePublishedEpox: article.sk,
      section: article.section,
      body: article.body,
    },
    // faster than doing a scan then a put, it is ATOMIC, no race condition
    // ConditionExpression: "attribute_not_exists(PK)"
  };

  const putReq = new PutCommand(params);

  try {
    const result = await ddbClient.send(putReq);
    return { statusCode: 200, body: JSON.stringify(result) };
   
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};

/*
headline: '',
  contentPath: '',
  datePublishedEpox: number,
  section: '',
  body: ''


*/
