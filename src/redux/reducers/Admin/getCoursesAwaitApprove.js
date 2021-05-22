import {
    GET_COURSES_AWAIT_APPROVE_REQUEST, GET_COURSES_AWAIT_APPROVE_SUCCESS, GET_COURSES_AWAIT_APPROVE_FAIL
} from '../../constants/Admin/getCoursesAwaitApprove';

const initialState = {
    loading2: false,
    error2: null,
    danhSachKhoaHocChoDuyet: [],

}

const getCoursesAwaitApproveReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES_AWAIT_APPROVE_REQUEST: 
            return { ...state, loading2: true, error2: null }
        case GET_COURSES_AWAIT_APPROVE_SUCCESS: {
            // console.log("reducer", action.payload.data)
            let count1 = 0;
            let count2 = 0;
                state.danhSachKhoaHocChoDuyet.forEach((item, index) => {
                    let indexCoures = item.indexOf(action.payload.data[0]);
                    if (indexCoures !== -1) {
                        count1 += 1;
                    }
                    if(item[0] === action.payload.data[0] && item.length !== action.payload.data.length && action.payload.data.length > 1){
                        count2 += 1;
                        return state.danhSachKhoaHocChoDuyet[index] = action.payload.data;  
                    }
                    if(item[0] === action.payload.data[0] && item.length !== action.payload.data.length && action.payload.data.length <= 1){
                        count2 += 1;
                        return state.danhSachKhoaHocChoDuyet[index] = [];  
                    }
                })
            
            if(count2 >= 1){
                return { ...state, loading2: false, danhSachKhoaHocChoDuyet: [...state.danhSachKhoaHocChoDuyet]}
            }else{
                if (count1 < 1 && action.payload.data.length > 1) {
                    return { ...state, loading2: false, danhSachKhoaHocChoDuyet: [...state.danhSachKhoaHocChoDuyet, action.payload.data] }
                } else {
                    return state
                }

            }

           
        };
        case GET_COURSES_AWAIT_APPROVE_FAIL: 
            return { ...state, loading2: false, error2: action.payload.error }
        default:
            return state;
    }
}

export default getCoursesAwaitApproveReducer