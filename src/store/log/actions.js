import axios from "axios";

const resource = process.env.API + "/logs";

export const get = async (context, email) => {
  return await axios
    .get(
      resource +
      '?filter={"where":{"user.email":"' + email + '"},"order":["createdon ASC"]}',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
        }
      }
    )
    .then(response => {
      var result = response.data;
      return result;
    })
    .catch(error => {
      if (error.response) {
        throw error.response.data.error;
      }
    });
};
