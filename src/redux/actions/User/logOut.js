
export const userLogOut = (value) => {
return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
        type: "LOG_OUT",
        payload: { data: undefined }
    })
}
}