import { KH_DA_DUYET_REQUEST, KH_DA_DUYET_SUCCESS, KH_DA_DUYET_FAIL } from '../../constants/Admin/getApprovedCourses'

const initialState = {
    approvedCourseList: [],
    loading2: false,
    error2: null
}
const getApprovedCoursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case KH_DA_DUYET_REQUEST: 
            return { ...state, loading2: true }
        case KH_DA_DUYET_SUCCESS: {
            let count1 = 0;
            let count2 = 0;
            state.approvedCourseList.forEach((item, index) => {
                if (item[0] === action.payload.data[0]) {
                    count1 += 1;
                }

                if (item[0] === action.payload.data[0] && item.length !== action.payload.data.length && action.payload.data.length > 1) {
                    count2 += 1;
                    return state.danhSachKhoaHocChoDuyet[index] = action.payload.data;
                }
                if (item[0] === action.payload.data[0] && item.length !== action.payload.data.length && action.payload.data.length <= 1) {
                    count2 += 1;
                    return state.danhSachKhoaHocChoDuyet[index] = [];
                }
            })
            if (count2 >= 1) {
                return { ...state, loading2: false, danhSachKhoaHocChoDuyet: [...state.danhSachKhoaHocChoDuyet] }
            } else {
                if (count1 < 1 && action.payload.data.length > 1) {
                    return { ...state, approvedCourseList: [...state.approvedCourseList, action.payload.data], loading2: false }
                } else {
                    return state
                }
            }

        }
        case KH_DA_DUYET_FAIL:
                    return { ...state, error2: action.payload.error, loading2: false }
        default: return state
    }
}
export default getApprovedCoursesReducer;