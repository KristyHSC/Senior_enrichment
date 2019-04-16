import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCampuses, fetchStudents} from './store';
import Home from './Home';
import Campuses from './Campuses';
import Students from './Students';
import Nav from './Nav';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampus from './AddCampus';
import AddStudent from './AddStudent';

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
    fetchStudents: () => dispatch(fetchStudents())
  }
}

class App extends Component {
  componentWillMount(){
    this.props.fetchCampuses()
    this.props.fetchStudents()
  }


  render(){
    return (
      <Router>
      <div>
        <div className="header">
          <h1>Campuses and Students</h1>
        </div>
        <Nav />
      </div>
      <Route exact path='/' component={Home} />
      <Route exact path='/campuses' component={Campuses} />
      <Route exact path='/students' component={Students} />
      <Route exact path='/campuses/:id' component={SingleCampus} />
      <Route exact path='/students/:id' component={SingleStudent} />
      <Route exact path='/campus/create' component={AddCampus} />
      <Route exact path='/student/create' component={AddStudent} />
      </Router>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
