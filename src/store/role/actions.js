import axios from "axios";

const resource = process.env.API + "/roles";

export const get = async (context, id) => {
  if (id == null) {
    return await axios
      .get(
        resource +
        '?filter={"where": {},"include": []}',
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
          }
        }
      )
      .then(response => {
        var result = response.data.filter(item => {
          return item.id !== context.rootGetters["session/getUser"].id;
        });
        result = result.filter(item => {
          return item.name !== "administrator";
        });
        return result;
      })
      .catch(error => {
        if (error.response) {
          throw error.response.data.error;
        }
      });
  } else if (id != null) {
    return await axios
      .get(
        resource +
        "/" +
        id +
        '?filter={"fields": {},"include": []}',
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
  }
};
