import React, {Component} from 'react';
import {fetchStudents, returnAStudent, destoryStudent, editStudent} from './store';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    handleClick: (id) => dispatch(returnAStudent(id)),
    destoryStudent: (id) => dispatch(destoryStudent(id)),
    editStudent: (id, student) => dispatch(editStudent(id, student))
  }
}


class Students extends Component {
  componentWillMount(){
    this.props.fetchStudents()
  }

  clickHandle = id => {
    const history = this.props.history
    history.push(`/students/${id}`)
  }

  deleteClick = id => {
    this.props.destoryStudent(id)
  }

  openStudent = id => {
    const {students, campuses} = this.props
    const student = students.reduce((acc, student) => {
      return student.id === id? acc=student : acc
    }, {})
    return student.campusId === null? 'Null': 
      campuses.reduce((acc, campus) => {
        if(campus.id === student.campusId){
          acc = campus.name
        }
        return acc
      }, '')
  }

  updateHandler = (id, student) => {
    //console.log(id)
    //console.log(student)
    this.props.editStudent(id, student)
  }

  render(){
    const {students, campuses} = this.props
    return (
      <div>
        <button>+</button>
        {students.map(student => (
          <li key = {student.id}>
            <ul>{student.firstName} {student.lastName}</ul>
            <ul>Current Campus: {this. openStudent(student.id)}</ul>
            <select onChange={this.onCampusChange}>
              <option>Select a Campus</option>
              {campuses.map(campus => (
                <option key={campus.id}>{campus.name}</option>
              ))}
            </select>
            <button onClick={this.updateHandler(student.id, student)}>Update Campus</button>
            <button onClick={() => this.clickHandle(student.id)}>View</button>
            <button onClick={() =>this.deleteClick(student.id)}>X</button>
          </li>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);