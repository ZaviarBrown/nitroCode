const NEW_REQUEST = "friend/NEW_REQUEST";

const newRequest = (friend) => ({
  type: NEW_REQUEST,
  payload: friend,
});

export const sendNewRequest = () => async (dispatch) => {
  let body = JSON.stringify({});
  let data = await fetch("/api/friend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  data = await data.json();
  dispatch(newRequest());
};

let initialState = {};

export default function race(state = initialState, action) {
  switch (action.type) {
    case NEW_REQUEST: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
}
