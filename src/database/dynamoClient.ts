import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";

export const client = new Dynamo({
  client: new DynamoDBClient({ region: "us-east-2" }),
});
