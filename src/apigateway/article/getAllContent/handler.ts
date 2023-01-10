import {
  DynamoDB,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { region, tableName } from "../../../../config/config";


const ddbClient = new DynamoDB({ region: region });

export const handler = async () => {
  try {
    const scanInput: ScanCommandInput = {
      TableName: tableName,
    };
    

    const scanCommand = new ScanCommand(scanInput)

    const records = await ddbClient.send(scanCommand);

    let response;
    if(records?.Items && records.Items?.length>0) {
      response = records.Items.map((item) => unmarshall(item));
    }
    return {
      body: JSON.stringify(response),
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
