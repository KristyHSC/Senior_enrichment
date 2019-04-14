import React, {Component} from 'react';
import {connect} from 'react-redux';
import {returnACampus} from './store';
import AddStudent from './AddStudent';


const mapStateToProps = state => {
  return {
    campus: state.campus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    returnACampus: (id) => dispatch(returnACampus(id))
  }
}

class singleCampus extends Component {
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.returnACampus(id)
    
  }
  render(){
    const {campus } = this.props
    return (
      <div>
        <li>{campus.name}</li>
        <ul>address: {campus.address}</ul>
        <ul>description: {campus.description}</ul>
        <img src = {campus.imageUrl} height={200} weight={200}/>
        <AddStudent />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleCampus);