import React, {Component} from 'react';
import {destoryCampus, fetchCampuses} from './store';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
    destoryCampus: (id) => dispatch(destoryCampus(id))
  }
}

class Campuses extends Component {
  
  componentWillMount(){
    this.props.fetchCampuses()
  }

  clickHandle = (id) => {
    const history = this.props.history
    history.push(`/campuses/${id}`)
  }

  deleteClick = id => {
    this.props.destoryCampus(id)
  }

  render(){
    const campuses = this.props.campuses
    return (
      <div className="row justify-content-around">
        {campuses.map(campus => (
          <div id='eachCampus' key={campus.id}>
          <p onClick= {() => this.clickHandle(campus.id)}>{campus.name}</p>
          <button onClick={()=>this.deleteClick(campus.id)}> X </button>
          <img src={campus.imageUrl} height={200} weight={200}/>
          </div>
        ))}
      </div>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Campuses);