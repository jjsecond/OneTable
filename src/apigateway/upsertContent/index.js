const sdk = require("aws-sdk");
const dbClient = new sdk.DynamoDB.DocumentClient();

const tableName = process.env.ContentTable || "ContentTable";

const handler = async (event) => {
  const article = JSON.parse(event.body);
  if(article === null || article === undefined){
    return  { statusCode: 400, body: `no body: ${event.body}` };
  }

  const params = {
    TableName: tableName,
    Item: {
      contentId: article.contentPath,
      datePublishedEpox: Date.now(),
      section: article.section,
      body: article.body,
    },
  };

  try {
    await dbClient.put(params).promise();
    console.log(event);
    return { statusCode: 200, body: `Successfully added: ${event.body}` };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};

exports.handler = handler;


/*
headline: '',
  contentPath: '',
  datePublishedEpox: number,
  section: '',
  body: ''


*/

