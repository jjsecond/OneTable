import { Table } from "dynamodb-onetable";
import { ArticleModel } from "./article";
import { EditorModel } from "./editor";
import { ImageModel } from "./image";
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

type GetTable = () => {
  client: any;
  table: Table;
  models: {
    articleModel: ArticleModel;
    editorModel: EditorModel;
    imageModel: ImageModel;
  };
};

export { GetTable };
