import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  campuses: [],
  students: [],
  // campus: [],
  // student: []
}


const SET_CAMPUSES = 'SEED_CAMPUSES'
const SET_STUDENTS = 'SEED_STUDENTS'


const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
})

const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
})



export const fetchCampuses = () => {
  return dispatch => {
    return axios.get('/api/campuses')
      .then(campus => dispatch(setCampuses((campus.data))))
  }
}

export const fetchStudents = () => {
  return dispatch => {
    return axios.get('/api/students')
      .then(users => dispatch(setStudents(users.data)))
  }
}


export const addCampus = (campus) => {
  return dispatch => {
    return axios.post(`/api/campuses`, campus)
    .then(() => dispatch(fetchCampuses()))
    .then(() => console.log("Campus post successfully"))
    .catch(error => console.log("addCampus has error!", error))
  }
}

export const addStudent = (student) => {
  console.log(student)
  return dispatch => {
    return axios.post(`/api/students`, student)
    .then(() => dispatch(fetchStudents()))
    .then(() => console.log("Student post successfully"))
    .catch(error => console.log("addStudent has error!", error))
  }
}

export const editStudent = (id, student) => {
  return dispatch => {
    return axios.put(`/api/students/${id}`, student)
    .then(() => dispatch(fetchStudents()))
    .then(() => console.log('edit successfully'))
    // .catch(error => console.log("editStudent has error!", error))
  }
}

export const destoryCampus = id => {
  return dispatch => {
    return axios.delete(`/api/campuses/${id}`)
      .then(() => dispatch(fetchCampuses()))
  }
}

export const destoryStudent = id => {
  return dispatch => {
    return axios.delete(`/api/students/${id}`)
      .then(() => dispatch(fetchStudents()))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, campuses: action.campuses}
    case SET_STUDENTS:
      return {...state, students: action.students}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
