import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCampus} from './store';

const mapDispatchToProps = dispatch => {
  return {
    addCampus: (campus) => dispatch(addCampus(campus))
  }
}

class AddCampus extends Component{
  constructor (){
    super()
    this.state = {
        name: '',
        address: '',
        description: '',
    }  
}

onNameChange = e => {
    this.setState({name: e.target.value})
}

onAddChange = e => {
    this.setState({address: e.target.value})
}

onDesChange = e => {
    this.setState({description: e.target.value})
}

submitHandler = event => {
    event.preventDefault()
    const campus = this.state
    this.props.addCampus(campus)
}
  render(){
    return(
      <form id='new-campus-form' onSubmit={this.submitHandler}>
        <div className='input-group'>
        <input 
          className="form-control"
          type="text"
          name="name"
          placeholder="name"
          onChange={this.onNameChange}
        />
        <input 
          className="form-control"
          type="text"
          name="address"
          placeholder="address"
          onChange={this.onAddChange}
        />
        <input 
          className="form-control"
          type="text"
          name="description"
          placeholder="description"
          onChange={this.onDesChange}
        />
        </div>
        <button type="submit">Create!</button>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(AddCampus);
