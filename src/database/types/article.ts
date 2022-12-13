import { Entity, Model } from 'dynamodb-onetable';

import { MySchema } from '../oneTableSchema';

type Article = Entity<typeof MySchema.models.Article>;
type ArticleModel = Model<Article>;

export { Article, ArticleModel };