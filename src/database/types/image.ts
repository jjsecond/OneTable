import { Entity, Model } from 'dynamodb-onetable';

import { MySchema } from '../oneTableSchema';

type Image = Entity<typeof MySchema.models.Image>;
type ImageModel = Model<Image>;

export { Image, ImageModel };