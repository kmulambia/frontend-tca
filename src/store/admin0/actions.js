import axios from "axios";

const resource = process.env.API + "/admin-0";

export const get = async (context, admin0Pcode) => {
  if (admin0Pcode == null) {
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
        var result = response.data;
        return result;
      })
      .catch(error => {
        if (error.response) {
          throw error.response.data.error;
        }
      });
  } else if (admin0Pcode != null) {
    return await axios
      .get(
        resource +
        "/" +
        admin0Pcode +
        '?filter={"include": []}',
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

export const create = async (context, data) => {
  return await axios
    .post(resource, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
      }
    })
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

export const update = async (context, data) => {
  return await axios
    .patch(resource + "/" + data.admin0Pcode, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
      }
    })
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

export const remove = async (context, admin0Pcode) => {
  return await axios
    .delete(resource + "/" + admin0Pcode, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
      }
    })
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

