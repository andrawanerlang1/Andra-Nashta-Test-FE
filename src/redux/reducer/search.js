const initialState = {
  value: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH": {
      return {
        ...state,
        value: state,
      };
    }
    default: {
      return state;
    }
  }
};

export default search;
