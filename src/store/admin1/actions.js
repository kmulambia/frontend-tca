import axios from "axios";

const resource = process.env.API + "/admin-1";

export const get = async (context, admin1Pcode) => {
  if (admin1Pcode == null) {
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
  } else if (admin1Pcode != null) {
    return await axios
      .get(
        resource +
        "/" +
        admin1Pcode +
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
    .patch(resource + "/" + data.admin1Pcode, data, {
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

export const remove = async (context, admin1Pcode) => {
  return await axios
    .delete(resource + "/" + admin1Pcode, {
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

export const getByAdmin0 = async (context, admin0Pcode) => {
  return await axios
    .get(
      resource +
      '?filter={"where": {"admin0Pcode":' + admin0Pcode + '},"include": []}',
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