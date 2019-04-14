import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  campuses: [],
  students: [],
  campus: [],
  student: []
}


const SET_CAMPUSES = 'SEED_CAMPUSES'
const SET_STUDENTS = 'SEED_STUDENTS'
const SINGLE_CAMPUS = 'SINGLE_CAMPUS'
const SINGLE_STUDENT = 'SINGLE_STUDENT'

const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
})

const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
})

const singleCampus = campus => ({
  type: SINGLE_CAMPUS,
  campus
})

const singleStudent = student => ({
  type: SINGLE_STUDENT,
  student
})

export const fetchCampuses = () => {
  return dispatch => {
    axios.get('/api/campuses')
      .then(campus => dispatch(setCampuses((campus.data))))
  }
}

export const fetchStudents = () => {
  return dispatch => {
    axios.get('/api/students')
      .then(users => dispatch(setStudents(users.data)))
  }
}

export const returnACampus = (id) => {
  return dispatch => {
    axios.get(`/api/campuses/${id}`)
      .then(campus => dispatch(singleCampus(campus.data)))
  }
}

export const returnAStudent = id => {
  return dispatch => {
    axios.get(`/api/students/${id}`)
      .then(user => dispatch(singleStudent(user.data)))
  }
}

export const addCampus = (campus) => {
  return dispatch => {
    axios.post(`/api/campuses`, campus)
    .then(() => dispatch(fetchCampuses()))
    .then(() => console.log("Campus post successfully"))
    .catch(error => console.log("addCampus has error!", error))
  }
}

export const addStudent = (student) => {
  return dispatch => {
    axios.post(`/api/students`, student)
    .then(() => dispatch(fetchStudents()))
    .then(() => console.log("Student post successfully"))
    .catch(error => console.log("addStudent has error!", error))
  }
}

export const editStudent = (id, student) => {
  return dispatch => {
    axios.put(`/api/students/${id}`, student)
    .then(() => dispatch(fetchStudents()))
    .catch(error => console.log("editStudent has error!", error))
  }
}

export const destoryCampus = id => {
  return dispatch => {
    axios.delete(`/api/campuses/${id}`)
      .then(() => dispatch(fetchCampuses()))
  }
}

export const destoryStudent = id => {
  return dispatch => {
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(fetchStudents()))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, campuses: action.campuses}
    case SET_STUDENTS:
      return {...state, students: action.students}
    case SINGLE_CAMPUS:
      return {...state, campus: action.campus}
    case SINGLE_STUDENT:
      return {...state, student: action.student}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
