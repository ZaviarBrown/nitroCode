const NEW_REQUEST = "friend/NEW_REQUEST";
const GET_REQUESTS = "friend/GET_REQUESTS";

const newRequest = (payload) => ({
  type: NEW_REQUEST,
  payload,
});

const getRequests = (requests) => ({
  type: GET_REQUESTS,
  payload: requests,
});

export const sendNewRequest = (id) => async (dispatch) => {
  let body = JSON.stringify({ id });
  let data = await fetch("/api/friend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  data = await data.json();
  dispatch(newRequest(data));
};

export const getAllRequests = () => async (dispatch) => {
  const response = await fetch("/api/friend/");
  const requests = await response.json();
  console.log(requests["friends"]);
  dispatch(getRequests(requests["friends"]));
};

let initialState = {};

export default function friend(state = initialState, action) {
  switch (action.type) {
    case NEW_REQUEST: {
      const newState = { ...state };
      for (let x in action.payload) {
        newState[x] = action.payload[x];
      }
      return newState;
    }
    case GET_REQUESTS: {
      const newState = { ...state };
      for (let x in action.payload) {
        newState[x] = action.payload[x]["id"];
      }
      return newState;
    }
    default:
      return state;
  }
}
