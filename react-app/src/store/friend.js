const NEW_REQUEST = "friend/NEW_REQUEST";
const GET_REQUESTS = "friend/GET_REQUESTS";
const ACCEPT_REQUEST = "friend/ACCEPT_REQUEST";
const GET_FRIENDS = "friend/GET_FRIENDS";

const newRequest = (request) => ({
  type: NEW_REQUEST,
  payload: request,
});

const getRequests = (received, sent) => ({
  type: GET_REQUESTS,
  payload: { received, sent },
});

const acceptRequest = (payload) => ({
  type: ACCEPT_REQUEST,
  payload,
});

const getFriends = (payload) => ({
  type: GET_FRIENDS,
  payload,
});

export const sendNewRequest = (id) => async (dispatch) => {
  let body = JSON.stringify(id);
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
  dispatch(getRequests(requests["received"], requests["sent"]));
};

export const acceptOneRequest = (id) => async (dispatch) => {
  let body = JSON.stringify(id);
  let data = await fetch("/api/friend/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  data = await data.json();
  dispatch(acceptRequest(data));
};

export const getAllFriends = () => async (dispatch) => {
  const res = await fetch("/api/friend/all");
  const friends = await res.json();
  dispatch(getFriends(friends["current"]));
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
        newState[x] = action.payload[x];
      }
      return newState;
    }
    case ACCEPT_REQUEST: {
      const newState = { ...state };
      return newState;
    }
    case GET_FRIENDS: {
      const newState = { ...state };
      newState["friends"] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
