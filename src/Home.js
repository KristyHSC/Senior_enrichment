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
    if (this.openStudents()>0){
      return (
        <div>
          We have {this.openStudents()} open Students waiting for you to assign a campus. 
        </div>
      )
    }
    return (
      <div>
        All the students belong to a Campus.
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home);