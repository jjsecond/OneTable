// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

// const dbClient = new AWS.DynamoDB.DocumentClient();
const ddbClient = new DynamoDB({ region: "us-east-2" });

const tableName = process.env.ContentTable || "ContentTable";

export const handler = async (event: APIGatewayEvent) => {
  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }

  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      contentId: {S: article.contentPath.toString()},
      datePublishedEpox: {N: Date.now().toString()},
      section: { S: article.section},
      body: {S: article.body},
    },
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
