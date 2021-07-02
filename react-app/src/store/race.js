const GET_CODE = "race/GET_CODE";

const getCode = (payload) => ({
  type: GET_CODE,
  payload,
});

export const getOneCode = (id) => async (dispatch) => {
  const res = await fetch(`/api/race/${id}`);
  const code = await res.json();
  console.log(code);
  dispatch(getCode(code));
};

const initialState = {};

export default function code(state = initialState, action) {
  switch (action.type) {
    case GET_CODE: {
      let newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
