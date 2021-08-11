const GET_STAT = "stat/GET_STAT";
const UPDATE_STAT = "stat/UPDATE_STAT";

const getStat = (payload) => ({
  type: GET_STAT,
  payload,
});

const updateStat = (payload) => ({
  type: UPDATE_STAT,
  payload,
});

export const getOneStat = (id) => async (dispatch) => {
  const res = await fetch(`/api/stat/${id}`);
  const stat = await res.json();
  console.log(stat);
  dispatch(getStat(stat));
};

export const updateOneStat = (cpm) => async (dispatch) => {
  let body = JSON.stringify(cpm);
  console.log("This is running");
  let data = await fetch("/api/stat/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  data = await data.json();
  console.log(data);
  dispatch(updateStat(data));
};

const initialState = {};

export default function stat(state = initialState, action) {
  switch (action.type) {
    case GET_STAT: {
      let newState = { ...state };
      for (let x in action.payload) {
        newState[x] = action.payload[x];
      }
      return newState;
    }
    case UPDATE_STAT: {
      return state;
    }
    default:
      return state;
  }
}
