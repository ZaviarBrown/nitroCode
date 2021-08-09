const GET_CODE = "code/GET_CODE";
const GET_ALL = "code/GET_ALL";

const getCode = (payload) => ({
  type: GET_CODE,
  payload,
});

const getMoreCode = (payload) => ({
  type: GET_ALL,
  payload,
});

export const getOneCode = (id) => async (dispatch) => {
  const res = await fetch(`/api/code/${id}`);
  const code = await res.json();
  dispatch(getCode(code));
};

export const getAllCode = () => async (dispatch) => {
  const res = await fetch("/api/code/all");
  const code = await res.json();
  dispatch(getMoreCode(code));
};

const initialState = {};

export default function code(state = initialState, action) {
  switch (action.type) {
    case GET_CODE: {
      let newState = { ...state };
      for (let x in action.payload) {
        newState[x] = action.payload[x];
      }
      return newState;
    }
    case GET_ALL: {
      return action.payload;
    }
    default:
      return state;
  }
}
