const NEW_REQUEST = "friend/NEW_REQUEST";

const newRequest = (request) => ({
  type: NEW_REQUEST,
  payload: request,
});

export const sendNewRequest = (id) => async (dispatch) => {
  console.log(id);
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
    default:
      return state;
  }
}
