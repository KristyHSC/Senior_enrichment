import React, {Component} from 'react';
import {destoryStudent, editStudent} from './store';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (id) => dispatch(returnAStudent(id)),
    destoryStudent: (id) => dispatch(destoryStudent(id)),
    editStudent: (id, student) => dispatch(editStudent(id, student))
  }
}


class Students extends Component {
  constructor (){
    super()
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0,
        campusId: null,
    }
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
    return student.campusId === null? 'Does not belong to a campus': 
      campuses.reduce((acc, campus) => {
        if(campus.id === student.campusId){
          acc = campus.name
        }
        return acc
      }, '')
  }

  //why can't I set state?

  onCampusChange = (id, e) => {
    const {campuses, students} = this.props
    const student = students.reduce((acc, astudent) => {
      if (astudent.id === id){
        acc = astudent
      }
      return acc
    }, {})
    this.setState(student)
    const campus = campuses.reduce((acc, acampus) => {
      if(acampus.name === e.target.value){
        acc = acampus
      }
      return acc;
    }, {})
    this.setState({campusId: campus.id})
  }

  editStudent = (event) => {
    event.preventDefault()
    const student = this.state
    const campuses = this.props.campuses
    const campus = campuses.reduce((acc, campus) => {
      if(campus.id === student.campusId){
        acc = campus
      }
      return acc
    }, {})
    const id = student.id
    this.props.editStudent(id, student)
    console.log(this.state)
    window.alert(`Student ${student.firstName} ${student.lastName} is now assign to ${campus.name}`)
    location.reload()
  }

  addStudent = event => {
    event.preventDefault()
    const history = this.props.history
    history.push('/student/create')
  }

  render(){
    const {students, campuses} = this.props
    return (
      <div>
        <button onClick={this.addStudent}>Add a student</button>
        <div id="studentList" className="row justify-content-around" >
        {students.map(student => (
          <div key = {student.id}>
            <h3 onClick={()=> this.clickHandle(student.id)}>
              {student.firstName} {student.lastName}
            </h3>
            <p>Current Campus: {this.openStudent(student.id)}</p>
            <img src={student.imageUrl} height={100} weight={100} />
            <div id='selection'> 
              <select onChange = {(e) => this.onCampusChange(student.id, e)}>
                <option>none</option>
                {campuses.map(campus => (
                  <option key={campus.id}>{campus.name}</option>
                ))}
              </select>
              <button onClick = {this.editStudent}>Assign campus</button>
              <button onClick={() =>this.deleteClick(student.id)}>Delete Student</button> 
            </div>
            <p>-----------------</p>
            </div>
        ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);