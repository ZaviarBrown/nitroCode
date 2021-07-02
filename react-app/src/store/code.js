const GET_CODE = "code/GET_CODE";

const getCode = (payload) => ({
  type: GET_CODE,
  payload,
});

export const getAllCode = () => async (dispatch) => {
  const res = await fetch(`/api/code/`);
  const code = await res.json();
  console.log(code);
  dispatch(getCode(code));
};

const initialState = {};

export default function code(state = initialState, action) {
  switch (action.type) {
    case GET_CODE: {
      let newState = { ...state };
      action.payload.codeblocks.forEach((codeblock) => {
        newState[codeblock.id] = codeblock.lines;
      });
      return newState;
    }
    default:
      return state;
  }
}
