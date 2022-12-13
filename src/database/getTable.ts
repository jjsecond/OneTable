import { Table } from "dynamodb-onetable";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";
import { MySchema } from "./oneTableSchema";

import { Article, Editor } from "./types";
import { GetTable } from "./types/getTable";

const getTable: GetTable = () => {

  const client = new Dynamo({
    client: new DynamoDBClient({ region: "us-east-2" }),
  });

  const table = new Table({
    client: client,
    name: "ContentTable",
    schema: MySchema,
  });

  const editorModel = table.getModel<Editor>("Editor");
  const articleModel = table.getModel<Article>("Article");

  return {
    client,
    table: "ContentTable",
    models: {
      editorModel,
      articleModel,
    },
  };
};

export { getTable };
