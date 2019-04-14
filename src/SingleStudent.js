import React, {Component} from 'react';
import { connect } from 'react-redux';
import {returnAStudent} from './store';
import AddStudent from './AddStudent'

const mapStateToProps = state => {
  return {
    student: state.student
  }
}

const mapDispatchToProps = dispatch => {
  return {
    returnAStudent: (id) => dispatch(returnAStudent(id))
  }
}

class singleStudent extends Component {
  constructor(){
    super()
    this.state = {
      edit: false
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.returnAStudent(id)
  }

  editStudent = () => {
    this.setState({edit: true})
  }

  render(){
    const {student} = this.props
    if (this.state.edit) {
      return (
        <AddStudent  student = {student}/>
      )
    }
    return (
      <div>
        <button onClick={this.editStudent}>Edit</button>
        <li>{student.firstName} {student.lastName}</li>
        <ul>email: {student.email}</ul>
        <ul>gpa: {student.gpa}</ul>
        <ul>campusId: {student.campusId}</ul>
        <img src = {student.imageUrl} height={200} weight={200}/>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleStudent)