const NEW_RACE = "race/NEW_RACE";

const newRace = (race) => ({
  type: NEW_RACE,
  payload: race,
});

export const createNewRace =
  (codeblockId, placement, cpm, time) => async (dispatch) => {
    let body = JSON.stringify({ codeblockId, placement, cpm, time });
    let data = await fetch("/api/race/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    data = await data.json();
    let id = data["id"];
    let userId = data["userId"];
    dispatch(newRace(id, userId, codeblockId, placement, cpm, time));
  };

let initialState = {};

export default function race(state = initialState, action) {
  switch (action.type) {
    case NEW_RACE: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
}
