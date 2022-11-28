import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient();

// const TABLE_NAME = process.env.TABLE_NAME || "";
// const PRIMARY_KEY = process.env.PRIMARY_KEY || "";

export const handler = async (event) => {
  // const item =JSON.parse(event.body);


  // const params = {
  //   TableName: TABLE_NAME,
  //   Item: {itemId: item.id, test: item.test},
  // };

  try {
    // await db.put(params).promise();
    console.log(event);
    return { statusCode: 200, body: event };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
