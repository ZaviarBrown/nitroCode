const GET_CODE = "code/GET_CODE";

const getCode = (payload) => ({
  type: GET_CODE,
  payload,
});

export const getOneCode = (id) => async (dispatch) => {
  const res = await fetch(`/api/code/${id}`);
  const code = await res.json();
  dispatch(getCode(code));
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
    default:
      return state;
  }
}
