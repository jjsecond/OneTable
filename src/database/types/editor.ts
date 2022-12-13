import { Entity, Model } from 'dynamodb-onetable';

import { MySchema } from '../oneTableSchema';

type Editor = Entity<typeof MySchema.models.Editor>;
type EditorModel = Model<Editor>;

export { Editor, EditorModel };