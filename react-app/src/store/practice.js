const NEW_RACE = "practice/NEW_RACE";

const newPractice = (practice) => ({
  type: NEW_RACE,
  payload: practice,
});

export const createNewPractice =
  (codeblockId, placement, cpm, time) => async (dispatch) => {
    let body = JSON.stringify({ codeblockId, placement, cpm, time });
    let data = await fetch("/api/practice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    data = await data.json();
    let id = data["id"];
    let userId = data["userId"];
    dispatch(newPractice(id, userId, codeblockId, placement, cpm, time));
  };

let initialState = {};

export default function practice(state = initialState, action) {
  switch (action.type) {
    case NEW_RACE: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
}
