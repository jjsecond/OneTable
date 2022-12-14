// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../database/getTable";


export const handler = async (event: APIGatewayEvent) => {
    const pathParams = event.pathParameters;

    console.log(pathParams);
  
    const table = getTable();
  
    const firstName = pathParams?.pk || "";
    const lastName = pathParams?.sk || "";
  
    try {
      let result = await table.models.editorModel.find({
          firstName,
          lastName
        });
      return { statusCode: 200, body: `Found: ${JSON.stringify(result)}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
