import { Table } from "dynamodb-onetable";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";
import { MySchema } from "./oneTableSchema";

import { Article, Editor, Image } from "./types";
import { GetTable } from "./types/getTable";
import { region, tableName } from "../../config/config";

const client = new Dynamo({
  client: new DynamoDBClient({ region: region }),
});

const getTable: GetTable = () => {


  const table = new Table({
    client: client,
    name: tableName,
    schema: MySchema, 
  });

  const editorModel = table.getModel<Editor>("Editor");
  const articleModel = table.getModel<Article>("Article");
  const imageModel = table.getModel<Image>("Image");

  return {
    client,
    table,
    models: {
      editorModel,
      articleModel,
      imageModel,
    },
  };
};

export { getTable };
