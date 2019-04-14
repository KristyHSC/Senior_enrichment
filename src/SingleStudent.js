import React, {Component} from 'react';
import AddStudent from './AddStudent'
import Axios from 'axios';


class singleStudent extends Component {
  constructor(){
    super()
    this.state = {
      student: {},
      edit: false
    }
  }
  componentWillMount(){
    const id = this.props.match.params.id
    Axios.get(`/api/students/${id}`)
      .then(student => this.setState({student: student.data}))
  }

  editStudent = () => {
    this.setState({edit: true})
  }

  render(){
    const {student} = this.state
    console.log(student)
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

export default singleStudent;
