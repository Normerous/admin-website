const initialState = {
    email: "",
    token: localStorage.getItem("token")
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE':
            return { ...state };
        case "SET_DETAIL_FROM_LOGIN":
            return { ...state, email: action.payload.email, token: action.payload.token };
        default:
            return { ...state }
    }
}
export default reducer;