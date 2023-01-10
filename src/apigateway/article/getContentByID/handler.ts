// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../../database/getTable";

export const handler = async (event: APIGatewayEvent) => {
  const pathParams = event.pathParameters;

  console.log(pathParams);

  const table = getTable();

  const contentPath = pathParams?.pk || "";
  const epox = pathParams?.sk || '';

  try {
    let result = await table.models.articleModel.find({
      contentPath,
      datePublishedEpox: epox,
    });
    return { statusCode: 200, body: `Found: ${JSON.stringify(result)}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};