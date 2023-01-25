// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../../database/getTable";

export const handler = async (event: APIGatewayEvent) => {
  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }
  const table = getTable();

  const firstName = article?.firstName || "";
  const lastName = article?.lastName || "";

  const contentPath = article?.headline || "";
  const epox = article?.date || '';

  // add condition execption

  try {
    let batch = {}

    let editor = await table.models.editorModel.create({
        firstName: article.firstName,
        lastName: article.lastName,
        username: article.username,
        role: article.role,
      },{batch});

      await table.models.articleModel.create(
        {
          contentPath: article.contentPath,
          datePublishedEpox: article.datePublishedEpox,
          section: article.section,
          body: article.body,
          author: article.author,
        },
        { batch }
      );



      let res = await table.table.batchWrite(batch);
console.log(res)
    return {
      statusCode: 200,
      body: `${JSON.stringify(res)}`,
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};