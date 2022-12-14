import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";
import { region } from "../../config/config";

export const client = new Dynamo({
  client: new DynamoDBClient({ region: region }),
});
