export const MySchema = {
  format: "onetable:1.1.0",
  version: "0.0.1",
  indexes: {
    primary: { hash: "pk", sort: "sk" },
    gs1: { hash: "gs1pk" },
    // ls1:     { sort: 'id', type: 'local' },
  },
  models: {
    Article: {
      pk: { type: String, value: "article" },
      sk: { type: String, value: "title#${contentPath}" },
      // id:          { type: String, generate: 'ulid', validate: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i },
      contentPath: { type: String, required: true },
      datePublishedEpox: { type: String, required: true },
      section: { type: String },
      body: { type: String },
      author: { type: String },

      gsi1pk: { type: String, value: "article" },
      // gsi1sk: { type: String, value: 'print-attribute#${region}' },
    },
    Editor: {
      pk: { type: String, value: "user#${firstName}" },
      sk: { type: String, value: "user-name#${lastName}" },
      // id:          { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      username: { type: String, required: true },
      role: {
        type: String,
        enum: ["author", "editor"],
        required: true,
        default: "author",
      },
      articlesWritten: { type: Number, default: 0, required: true },
      // ttl needs to be an epoch type in seconds
      ttl: {
        ttl: true,
        type: Number,
        default: () => {
          return Math.floor(Date.now() / 1000 + 10);
        },
      },
      gs1pk: { type: String, value: "editor" },
      // gs1sk:       { type: String, value: 'user:' },
    },
    Image: {
      pk: { type: String, value: "image#${fileName}" },
      sk: { type: String, value: "image-path#${path}" },
      fileName: { type: String, require: true },
      path: { type: String, require: true },
      height: { type: Number, require: true },
      width: { type: Number, require: true },
      altText: { type: String, require: true },
      caption: { type: String, require: true },
    },
  },
  params: {
    isoDates: true,
    timestamps: true,
    partial: false,
  },
};
