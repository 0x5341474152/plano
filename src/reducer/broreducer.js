export const BroReducer = (state, { type, payload }) => {
    switch (type) {
        case "NAME":
            return {
                ...state,
                name: payload
            };
        case "TIME":
            return {
                ...state,
                time: payload
            };
        case "MESSAGE":
            return {
                ...state,
                message:
                    payload>=0 && payload<12 ?"Good morning" :payload>=12 && payload<=17?"Good evening":"Good night"
            };
        case "TASK":
            return {
                ...state,
                task: payload
            };
        case "CLEAR":
            return {
                ...state,
                task: null
            };
        default:
            return state;
    }
};
