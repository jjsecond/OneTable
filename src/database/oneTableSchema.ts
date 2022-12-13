export const MySchema = {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        // gs1:     { hash: 'gs1pk', sort: 'gs1sk', follow: true },
        // ls1:     { sort: 'id', type: 'local' },
    },
    models: {
        Article: {
            pk:          { type: String, value: 'article:${contentPath}' },
            sk:          { type: String, value: 'datePublishedEpox:' },
            // id:          { type: String, generate: 'ulid', validate: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i },
            contentPath:        { type: String, required: true },
            datePublishedEpox:      { type: Number, required: true },
            section: { type: String },
            body: { type: String },
        },
        Editor: {
            pk:          { type: String, value: 'account:${firstName}' },
            sk:          { type: String, value: 'user:${lastName}' },
            id:          { type: String, required: true },
            email:       { type: String, required: true },
            firstName:   { type: String, required: true },
            lastName:    { type: String, required: true },
            username:    { type: String, required: true },
            // role:        { type: String, enum: ['author', 'editor'], required: true, default: 'author' },
            // articlesWritten:     { type: Number, default: 0 },
            // gs1pk:       { type: String, value: 'user-email:${email}' },
            // gs1sk:       { type: String, value: 'user:' },
        }
    },
    params: {
        'isoDates': true,
        'timestamps': true,
    },
}