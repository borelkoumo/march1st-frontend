import { api } from "../../boot/axios";
//helper function
const _postQueryServer = async (path, payload = {}, token = null) => {
  let data={
    ...payload
  }
  if(token)
    api.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return api({
    mode: "cors",
    url: path,
    method: "POST",
    data: data,
    config: {
      headers: {
        "Content-Type": "application/json"
      },
    },
  })
    .then((response) => {
      //console.log(response);
      return Promise.resolve(response.data);
      /*if (response.data.status === "OK") {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data.message);
      }*/
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

const _getQueryServer = async (path, payload = {}, token = null) => {
  api.defaults.headers.common = { Authorization: `Bearer ${token}` };

  return api({
    mode: "cors",
    url: path,
    method: "GET",
    data: payload,
    config: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then((response) => {
        return Promise.resolve(response.data);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

const _putQueryServer = async (path, payload = {}, token = null) => {
  api.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return api({
    mode: "cors",
    url: path,
    method: "PUT",
    data: payload,
    config: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then((response) => {
      if (response.data.status === "OK") {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data.message);
      }
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

const _deleteQueryServer = async (path, payload = {}, token = null) => {
  api.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return api({
    mode: "cors",
    url: path,
    method: "delete",
    config: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then((response) => {
      if (response.data.status === "OK") {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data.message);
      }
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export {
  _postQueryServer,
  _getQueryServer,
  _putQueryServer,
  _deleteQueryServer,
};
