import { Table } from "dynamodb-onetable";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";
import { MySchema } from "./oneTableSchema";

import { Article, Editor } from "./types";
import { GetTable } from "./types/getTable";
import { region, tableName } from "../../config/config";


const getTable: GetTable = () => {

  const client = new Dynamo({
    client: new DynamoDBClient({ region: region }),
  });

  const table = new Table({
    client: client,
    name: tableName,
    schema: MySchema, 
  });

  const editorModel = table.getModel<Editor>("Editor");
  const articleModel = table.getModel<Article>("Article");

  return {
    client,
    table: tableName,
    models: {
      editorModel,
      articleModel,
    },
  };
};

export { getTable };
