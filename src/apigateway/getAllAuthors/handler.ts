import { getTable } from "../../database/getTable";
  
  export const handler = async () => {
    const table = getTable();
    try {

        let response = await table.models.editorModel.scan();

  
      return {
        body: JSON.stringify(response),
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify(err) };
    }
  };
  