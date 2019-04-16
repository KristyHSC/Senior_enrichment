import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    students: state.students
  }
}

class singleCampus extends Component {
  constructor(){
    super()
    this.state = {
      campus: {}
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id
    Axios.get(`api/campuses/${id}`)
      .then(campus => this.setState({campus: campus.data}))
    
  }

  render(){
    const {campus} = this.state
    const {students} = this.props
    const campusStudents = students.filter(student => student.campusId === campus.id)
    return (
      <div>
        <h4>{campus.name}</h4>
        <img src = {campus.imageUrl} height={200} weight={200}/>
        <p>address: {campus.address}</p>
        <p>description: {campus.description}</p>
        <div>
          <p>This campus has the following students: </p>
          {campusStudents.map(student => (
            <li key={student.id}>{student.firstName} {student.lastName}</li>
          ))}
        </div>
        {/* <AddStudent /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps)(singleCampus);