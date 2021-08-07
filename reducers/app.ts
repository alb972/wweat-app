
const initState = {
    availableRestos: [],
};

function app(state = initState, action: any) {
    let nexState: any = null;

    switch (action.type) {
        case "UPDATE":
            nexState = {
                ...state,
                availableRestos: action.value,
            };
            return nexState;
        default:
            return state
    }
}

export default app;