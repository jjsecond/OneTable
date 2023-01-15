// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../../database/getTable";

export const handler = async (event: APIGatewayEvent) => {
//   const pathParams = event.pathParameters;

  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }

//   console.log(pathParams);

  const table = getTable();

  const pk = 'article';
  //needs no sk

  const lastKey = article.lastKey

  try {
      let next;
      let result;
    if(lastKey){
         result = await table.models.articleModel.find(
            { pk, sk: { begins: `title#` } },
            { limit: 3, next:lastKey }
          );
          
    }else{
         result = await table.models.articleModel.find(
            { pk, sk: { begins: `title#` } },
            { limit: 3, next }
          );
    }

    next = result.next;


      return {
        statusCode: 200,
        body: `Found: ${JSON.stringify(result)}, lastEvaluatedKey: ${JSON.stringify(next)}`,

      };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
