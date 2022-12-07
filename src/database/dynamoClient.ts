import Dynamo from "dynamodb-onetable/Dynamo";
import { Model, Table } from "dynamodb-onetable";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


const client = new Dynamo({
  client: new DynamoDBClient({ region: "us-east-2" }),
});
