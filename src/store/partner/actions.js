import axios from "axios";

const resource = process.env.API + "/partners";

export const get = async (context, id) => {
  if (id == null) {
    return await axios
      .get(
        resource +
        '?filter={"where": {},"include": ["partnerType"]}',
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
  } else if (id != null) {
    return await axios
      .get(
        resource +
        "/" +
        id +
        '?filter={"include": ["partnerType"]}',
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
    .patch(resource + "/" + data.id, data, {
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

export const remove = async (context, id) => {
  return await axios
    .delete(resource + "/" + id, {
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

