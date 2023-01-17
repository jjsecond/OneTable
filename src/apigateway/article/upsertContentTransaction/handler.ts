// import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { getTable } from "../../../database/getTable";

export const handler = async (event: APIGatewayEvent) => {
  console.log(event);

  const article = JSON.parse(event.body || "");
  if (article === null || article === undefined) {
    return { statusCode: 400, body: `no body: ${event.body}` };
  }
  const table = getTable();

  const firstName = article?.firstName || "";
  const lastName = article?.lastName || "";

  // add condition execption

  try {
    let author = await Promise.resolve(table.models.editorModel.get({
      firstName,
      lastName,
    }));


    

    const articleCount = author?.articlesWritten
      ? author?.articlesWritten + 1
      : 1;

    let transaction = {};

    await table.models.articleModel.create(
      {
        contentPath: article.contentPath,
        datePublishedEpox: article.datePublishedEpox,
        section: article.section,
        body: article.body,
        author: article.author,
      },
      { transaction }
    );

    await table.models.editorModel.update(
      {
        pk: `user#${firstName}`,
        sk: `user-name#${lastName}`,
        articlesWritten: articleCount,
      },
      { transaction }
    );

    const res = await table.table.transact("write", transaction, {
      parse: true,
      hidden: true,
    });

    return {
      statusCode: 200,
      body: `Article: ${JSON.stringify(res)}`,
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
// // import * as AWS from "aws-sdk";
// import { APIGatewayEvent } from "aws-lambda";
// import { getTable } from "../../../database/getTable";

// export const handler = async (event: APIGatewayEvent) => {
//   console.log(event);

//   const article = JSON.parse(event.body || "");
//   if (article === null || article === undefined) {
//     return { statusCode: 400, body: `no body: ${event.body}` };
//   }
//   const table = getTable();

//   // add condition execption

//   try {
//     let editor = await table.models.articleModel.create({
//       contentPath: article.contentPath,
//       datePublishedEpox: article.datePublishedEpox,
//       section: article.section,
//       body: article.body,
//       author: article.author,
//     });
//     return { statusCode: 200, body: JSON.stringify(editor) };
//   } catch (err) {
//     return { statusCode: 400, body: JSON.stringify(err) };
//   }
// };

/*
headline: '',
  contentPath: '',
  datePublishedEpox: number,
  section: '',
  body: ''


*/
