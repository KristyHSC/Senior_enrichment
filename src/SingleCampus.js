import React, {Component} from 'react';
import Axios from 'axios';



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
    return (
      <div>
        <li>{campus.name}</li>
        <ul>address: {campus.address}</ul>
        <ul>description: {campus.description}</ul>
        <img src = {campus.imageUrl} height={200} weight={200}/>
        {/* <AddStudent /> */}
      </div>
    )
  }
}

export default singleCampus;