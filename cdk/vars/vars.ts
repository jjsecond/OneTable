export const lambdasConfig = [
    {
        name: "getOnlyArticles",
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
      name: "upsertContent",
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
  ]