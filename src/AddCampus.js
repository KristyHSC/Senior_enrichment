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
        imageUrl: ''
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

onImgChange = e => {
  this.setState({imageUrl: e.target.value})
}

submitHandler = event => {
    event.preventDefault()
    const campus = this.state
    this.props.addCampus(campus)
    window.alert(`New Campus ${campus.name} is created.`)
    window.location.href = 'http://localhost:3000/#/campuses'
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
        <input 
          className="form-control"
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
          onChange={this.onImgChange}
        />
        </div>
        <button type="submit">Create!</button>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(AddCampus);
