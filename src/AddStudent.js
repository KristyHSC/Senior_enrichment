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
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0,
        campusId: null,
    }
  }

  componentWillMount(){
    if (this.props.student) {
      this.setState(this.props.student)
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
    //console.log(campuses)
    const campus = campuses.reduce((acc, campus) => {
      if(campus.name === e.target.value){
        acc = campus
      }
      return acc
    }, {})
    //console.log(campus)
    this.setState({campusId: campus.id})
  }

  createHandler = event => {
    event.preventDefault()
    const student = this.state
    this.props.addStudent(student)
  }

  updateHandler = (id) => {
    //event.preventDefault()
    const student = this.state
    console.log(id)
    console.log(student)
    this.props.editStudent(id, student)
  }

  
  render(){
    const {campuses} = this.props
    const studentId = this.state.id
    return(
      <form id='new-campus-form'>
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
          value = {this.state.gpa? this.state.email: "" }
          placeholder={this.state.gpa? this.state.email: "GPA" }
          onChange={this.onGPAChange}
        />
        <select onChange={this.onCampusChange}>
          <option>Select a Campus</option>
          {campuses.map(campus => (
            <option key={campus.id}>{campus.name}</option>
          ))}
        </select>
        </div>
        <button onClick={this.createHandler}>Create!</button>
        <button onClick={this.updateHandler(studentId)}>Update!</button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);