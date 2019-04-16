import React, {Component} from 'react';
import AddStudent from './AddStudent'
import Axios from 'axios';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  }
}

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
    const {campuses} = this.props
    console.log(student)
    if (this.state.edit) {
      return (
        <AddStudent  student = {student}/>
      )
    }
    return (
      <div>
        <div className='nav'>
        <h3>{student.firstName} {student.lastName}</h3>
        <button onClick={this.editStudent}>Edit</button>
        </div>
        <img src = {student.imageUrl} height={200} weight={200}/>
        <p>email: {student.email}</p>
        <p>gpa: {student.gpa}</p>
        <p>Belong to Campus: {campuses.reduce((acc, campus) => {
          if (campus.id === student.campusId){
            acc = campus;
          }
          return acc;
        }, {}).name}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(singleStudent);

