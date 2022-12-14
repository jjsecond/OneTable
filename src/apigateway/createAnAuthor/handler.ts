// import * as AWS from "aws-sdk";

import { getTable } from "../../database/getTable";
import { APIGatewayEvent } from "aws-lambda";


export const handler = async (event: APIGatewayEvent) => {
  console.log(event);

  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }
  const table = getTable();

  // add condition execption

  try {
    let editor = await table.models.editorModel.create({
      firstName: article.firstName,
      lastName: article.lastName,
      username: article.username,
      role: article.role,
    });
    return { statusCode: 200, body: JSON.stringify(editor) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
