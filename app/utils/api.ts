import axios from "axios";

// Crie a instância do Axios
const api = axios.create({
  baseURL: "https://192.168.174.168:8443", // Altere para sua URL
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptor para tratar erros detalhadamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição Axios:", {
      message: error.message,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export default api;
