import axios from "axios";

const resource = process.env.API + "/admin-3";

export const get = async (context, admin3Pcode) => {
  if (admin3Pcode == null) {
    return await axios
      .get(
        resource +
        '?filter={"where": {}}',
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
  } else if (admin3Pcode != null) {
    return await axios
      .get(
        resource +
        "/" +
        admin3Pcode +
        '?filter={}',
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
    .patch(resource + "/" + data.admin3Pcode, data, {
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

export const remove = async (context, admin3Pcode) => {
  return await axios
    .delete(resource + "/" + admin3Pcode, {
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



export const getByAdmin2 = async (context, admin2Pcode) => {
  return await axios
    .get(
      resource +
      '?filter={"where": {"admin2Pcode":"' + admin2Pcode + '"}}',
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