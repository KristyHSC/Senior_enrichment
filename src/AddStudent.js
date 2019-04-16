import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStudent, editStudent} from './store';

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addStudent: (campus) => dispatch(addStudent(campus)),
    editStudent: (id, student) => dispatch(editStudent(id, student))
  }
}

class AddStudent extends Component{
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

  componentWillMount(){
    if (this.props.student){
      this.setState(this.props.student)
      console.log(this.state)
    }
  }

  onFNameChange = e => {
    this.setState({firstName: e.target.value})
  }

  onLNameChange = e => {
    this.setState({lastName: e.target.value})
  }

  onEmailChange = e => {
    this.setState({email: e.target.value})
  }

  onGPAChange = e => {
    this.setState({gpa: e.target.value})
  }

  onCampusChange = e => {
    const {campuses} = this.props
    const campus = campuses.reduce((acc, campus) => {
      if(campus.name === e.target.value){
        acc = campus
      }
      return acc
    }, {})
    this.setState({campusId: campus.id})
  }

  createHandler = event => {
    event.preventDefault()
    const student = this.state
    this.props.addStudent(student)
    window.alert(`New student ${student.name} is created.`)
    window.location.href = 'http://localhost:3000/#/students'
  }

  editHandler = (event) => {
    event.preventDefault()
    const student = this.state
    const id = student.id
    this.props.editStudent(id, student)
    window.alert("Student info updated!")
    window.location.href = 'http://localhost:3000/#/students'
  }
  
  render(){
    const {campuses} = this.props
    // if (this.props.student){const id = this.props.student.id}
    return(
      <form id='new-campus-form' onSubmit={this.createHandler}>
        <div className='input-group'>
        <input 
          className="form-control"
          type="text"
          name="firstName"
          value = {this.state.firstName? this.state.firstName: "" }
          placeholder={this.state.firstName? this.state.firstName: "firstName" }
          onChange={this.onFNameChange}
        />
        <input 
          className="form-control"
          type="text"
          name="lastName"
          value = {this.state.lastName? this.state.lastName: "" }
          placeholder={this.state.lastName? this.state.lastName: "lastName" }
          onChange={this.onLNameChange}
        />
        <input 
          className="form-control"
          type="text"
          name="email"
          value = {this.state.email? this.state.email: "" }
          placeholder={this.state.email? this.state.email: "Email" }
          onChange={this.onEmailChange}
        />
        <input 
          className="form-control"
          type="integer"
          name="GPA"
          value = {this.state.gpa? this.state.gpa: "" }
          placeholder={this.state.gpa? this.state.gpa: "GPA" }
          onChange={this.onGPAChange}
        />
        <select onChange={this.onCampusChange}>
          <option>Select a Campus</option>
          {campuses.map(campus => (
            <option key={campus.id}>{campus.name}</option>
          ))}
        </select>
        </div>
        <button type="submit">Create!</button>
        <button onClick={this.editHandler}>Update!</button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);