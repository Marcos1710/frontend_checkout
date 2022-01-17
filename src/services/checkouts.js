import { getRequest, postRequest } from "../utils/api";

export const checkoutsAPi = {
  get: (page, offset) => getRequest(`checkouts?page=${page}&offset=${offset}`),
	post: (data) => postRequest("checkouts", data)
}