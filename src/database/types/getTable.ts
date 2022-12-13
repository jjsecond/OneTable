import { ArticleModel } from "./article";
import { EditorModel } from "./editor";
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

type GetTable = () => {
  client: any;
  table: String;
  models: {
    articleModel: ArticleModel;
    editorModel: EditorModel;
  };
};

export { GetTable };
