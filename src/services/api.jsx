import axios from "axios";


const getApi = () => {

//   const { showNotification } = MuTosat()

  const api = axios.create({});

  api.interceptors.request.use(
    (config) => {
      // const token = localStorage.getItem("token");
      const token = 1
      if (token) {
        config.headers["HeaderApiKey"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
    //   showNotification({ "message": "Ошибка сервера<br>Пожалуйста обновите страницу или пвторите попытку позже", "type": "er" })
      return Promise.reject(err);
    }
  );
  return { api }
};

export default getApi