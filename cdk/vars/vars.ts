export const lambdasConfig = [
  {
    name: "batchWrite",
    method: "POST",
    addId: false,
    lambdaFolder: "experimental",
  },
  {
    name: "batchGet",
    method: "POST",
    addId: false,
    lambdaFolder: "experimental",
  },
  {
    name: "paginateArticles",
    method: "POST",
    addId: false,
    lambdaFolder: "article",
  },
  {
    name: "getArticleBeginsWith",
    method: "GET",
    addId: true,
    lambdaFolder: "article",
  },
  {
    name: "getContentByID",
    method: "GET",
    addId: true,
    lambdaFolder: "article",
  },
  {
    name: "getAllContent",
    method: "GET",
    addId: false,
    lambdaFolder: "article",
  },
  {
    name: "upsertContentTransaction",
    method: "PUT",
    addId: false,
    lambdaFolder: "article",
  },
  {
    name: "deleteContent",
    method: "DELETE",
    addId: true,
    lambdaFolder: "article",
  },
  {
    name: "getAuthorById",
    method: "GET",
    addId: true,
    lambdaFolder: "author",
  },
  {
    name: "getAllAuthors",
    method: "GET",
    addId: false,
    lambdaFolder: "author",
  },
  {
    name: "createAnAuthor",
    method: "PUT",
    addId: false,
    lambdaFolder: "author",
  },
  {
    name: "deleteAuthor",
    method: "DELETE",
    addId: true,
    lambdaFolder: "author",
  },
];
