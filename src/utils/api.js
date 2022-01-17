import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/v1/',
  headers: {
    'Content-Type': 'application/json'
  },
});

async function handleHttpError(error) {
  const genericErrorMessage = "Algo deu errado, por favor tente novamente.";

	if (error.response && error.response.data) {
		return (
			error.response.data.error || error.response.data || genericErrorMessage
		);
	}

  return genericErrorMessage;
}

function makeHttpRequest(apiCall) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await apiCall();
      resolve(data.data);
    } catch (e) {
      reject(await handleHttpError(e));
    }
  });
}

export const getRequest = (path, options = {}) =>
  makeHttpRequest(() => api.get(path, options));
export const postRequest = (path, options = {}) =>
  makeHttpRequest(() => api.post(path, options));
export const putRequest = (path, options = {}) =>
  makeHttpRequest(() => api.put(path, options));
export const deleteRequest = (path, options = {}) =>
  makeHttpRequest(() => api.delete(path, options));
