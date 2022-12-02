import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";

const dbClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.ContentTable || "ContentTable";

export const handler = async (event: APIGatewayEvent) => {
  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }

  const params = {
    TableName: tableName,
    Item: {
      contentId: article.contentPath,
      datePublishedEpox: Date.now(),
      section: article.section,
      body: article.body,
    },
  };

  try {
    await dbClient.put(params).promise();
    console.log(event);
    return { statusCode: 200, body: `Successfully added: ${event.body}` };
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
