import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStudent, editStudent} from './store';

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    addStudent: (campus) => {dispatch(addStudent(campus, history))},
    editStudent: (id, student, History) => {dispatch(editStudent(id, student, History))}
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
    const {student} = this.props
    if (student){
      this.setState(student)
    }
  }

  onfirstNameChange = e => {
    this.setState({firstName: e.target.value})
  }

  onlastNameChange = e => {
    this.setState({lastName: e.target.value})
  }

  onemailChange = e => {
    this.setState({email: e.target.value})
  }

  ongpaChange = e => {
    this.setState({gpa: e.target.value})
  }

  onCampusChange = e => {
    const {campuses} = this.props
    const campus = campuses.reduce((acc, campus) => {
      if (campus.name === e.target.value){
        acc = campus
      }
      return acc
    }, {})
    this.setState({campusId: campus.id})
  }

  createHandler = event => {
    // const {history} = this.props
    console.log("create:", history)
    event.preventDefault()
    const student = this.state
    this.props.addStudent(student, history)
  }

  editHandler = event => {
    console.log(this.props)
    event.preventDefault()
    const {history} = this.props
    const student = this.state
    const id = student.id
    this.props.editStudent(id, student, history)
    //Q: why my history is not pushing? 
    /*A: Unlike createHandler, editHandler is called when a student's info
    is pass down from SingleStudent component, therefore, if we want to use 
    history, we will have to pass down the history.  
    */
  }
  
  render(){
    const {campuses} = this.props
    // if (this.props.student){const id = this.props.student.id}
    return(
      <form id='new-campus-form' onSubmit={this.createHandler}>
        <div className='input-group'>
        {/* {Object.keys(this.state).map(key => (
          <input 
          className="form-control"
          type="text"
          name="firstName"
          value = {this.state.key? this.state.key: key.toString() }
          placeholder={this.state.key? this.state.key: key.toString() }
          onChange={this.on`${key}`Change}
        />
        ))} */}
        <input 
          className="form-control"
          type="text"
          name="firstName"
          value = {this.state.firstName? this.state.firstName: "" }
          placeholder={this.state.firstName? this.state.firstName: "firstName" }
          onChange={this.onfirstNameChange}
        />
        <input 
          className="form-control"
          type="text"
          name="lastName"
          value = {this.state.lastName? this.state.lastName: "" }
          placeholder={this.state.lastName? this.state.lastName: "lastName" }
          onChange={this.onlastNameChange}
        />
        <input 
          className="form-control"
          type="text"
          name="email"
          value = {this.state.email? this.state.email: "" }
          placeholder={this.state.email? this.state.email: "Email" }
          onChange={this.onemailChange}
        />
        <input 
          className="form-control"
          type="integer"
          name="GPA"
          value = {this.state.gpa? this.state.gpa: "" }
          placeholder={this.state.gpa? this.state.gpa: "GPA" }
          onChange={this.ongpaChange}
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