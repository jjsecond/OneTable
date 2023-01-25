// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../../database/getTable";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const handler = async (event: APIGatewayEvent) => {
  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }
  const table = getTable();

  const firstName = article?.firstName || "";
  const lastName = article?.lastName || "";
  const sFirstName = article?.sfirstName || "";
  const slastName = article?.slastName || "";

  // const contentPath = article?.headline || "";
  // const epox = article?.date || '';

  // add condition execption

  try {
    let batch = {}

     await table.models.editorModel.get({
      firstName: firstName,
      lastName: lastName,
    }, batch);
  await table.models.editorModel.get({
    firstName: `user#${sFirstName}`,
    lastName: `user-name#${slastName}`,
    }, batch);

    //  const two = await table.models.articleModel.get({
    //     pk: `article`,
    //     sk: `title#${contentPath}`,
    //   }, {batch});



      let res = await table.table.batchGet(batch);
      

    return {
      statusCode: 200,
      body: `${JSON.stringify(res)}`,
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
