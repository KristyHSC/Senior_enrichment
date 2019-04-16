import React, {Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

class Home extends Component {
  openStudents = () => {
    const {students} = this.props
    const openStudent = students.filter(student => student.campusId === null)
    return openStudent.length
  }
  render(){
    const {students, campuses} = this.props
    if (this.openStudents()>0){
      return (
        <div>
          <p>
            We have {this.openStudents()} open Students waiting for you to assign a campus. 
          </p>
          <p>
          We have {campuses.length} Campuses and {students.length} Students.
          </p>
        </div>
      )
    }
    return (
      <div>
        <p>
          We have {campuses.length} Campuses and {students.length} Students, and all students belong to a campus.
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home);