import React, { Component} from 'react';
import {Switch} from 'react-router'
import {Route, withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import './App.css';
import LandingPageView from './views/VisitorView/LandingPageView'
import LoginView from './views/AdminView/Login'
import KennelView from './views/VisitorView/KennelView'
import DogView from './views/VisitorView/DogView'
import actions from './store/actions/index'
import { getKennels, getDogs, createNotification, clearState} from './store/actions/vistorActions';
import DogCardModal from './components/Visitor/DogCardModal';
import {AdminRoute} from "./helpers/AdminRoute";
import AdminView from "./views/AdminView/AdminDashboard";
import AboutPage from './components/Visitor/AboutPage/AboutPage'
import ContactPage from './components/Visitor/ContactPage/ContactPage'


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      hidden: true,
      requested: [],
    }
  }
componentDidMount(){
    this.props.getDogs()
    this.props.getKennels()
 } 
 requestDog(e, id){
   e.preventDefault();
   console.log('trying')
   const dog = this.props.dogs.find(dog=>dog.id ===id);
   this.setState({hidden: false, requested: dog})
 }
 submitRequest(message){
   console.log(message)
   this.props.createNotification(message)
 }
closeModal(e){
  e.preventDefault()
  this.props.clearState()
  this.setState({hidden:true})
}

  render() {
    return (
    <div className="App">
      <Switch>
        <Route exact path="/"  render={(props) => <LandingPageView hidden={this.state.hidden}{...props}  kennels={this.props.kennels} dogs={this.props.dogs} requestDog={this.requestDog.bind(this)}/>}/>
        <Route path="/login" render={(props)=> <LoginView
        {...props}
        />} />
        <Route path="/about" render={(props)=> <AboutPage
        {...props}
        />} />
        <Route path="/contact" render={(props)=> <ContactPage
        {...props}
        />} />
        <AdminRoute exact path="/admin/dashboard" component={AdminView} />
        <Route path="/kennels/:id"  render={(props) => <KennelView 
        {...props}  
        kennels={this.props.kennels} 
        dogs={this.props.dogs} 
        requestDog={this.requestDog.bind(this)}/>} />
        <Route path="/dogs/:id"  render={(props) => <DogView 
        {...props} 
        requestDog={this.requestDog.bind(this)}
        kennels={this.props.kennels} 
        dogs={this.props.dogs}
        />} 
        />
      </Switch>
      {this.state.hidden ? null :
        <DogCardModal 
        closeModal ={this.closeModal.bind(this)}
        clearState={this.props.clearState}
        kennels={this.props.kennels}
        dog={this.state.requested}
        submitting={this.props.submitting}
        submitted={this.props.submitted}
        submitRequest={this.submitRequest.bind(this)}/>
      }
    </div>
    )
  }
}
const mapStateToProps = (state)=>(
  {
      dogs: state.visitors.dogs,
      kennels: state.visitors.kennels,
      loading: state.visitors.loading,
      submitting: state.visitors.submitting,
      submitted: state.visitors.submitted,
      user: state.auth.user
  }
)
const mapDispatchToProps = dispatch => {
  return {
    getDogs: () => dispatch(getDogs()),
    getKennels: () => dispatch(getKennels()),
    clearState: () => dispatch(clearState()),
    createNotification: (content) => dispatch(createNotification(content)),
  };
};


export default  withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))