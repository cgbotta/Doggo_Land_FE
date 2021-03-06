import React, { Component } from 'react'
import Dashboard from "../../components/Admin/Dashboard/Dashboard"
import actions from "../../store/actions/index"
import { connect } from 'react-redux'
import AddDogModal from '../../components/Admin/Dashboard/AddDogModal'
class AdminDashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            user: props.user,
            hidden: true
        }
    }
    closeModal = (e) =>{
        e.preventDefault()
        // this.props.clearState()
        this.setState({hidden:true})
    }
    showModal = (e) =>{
        e.preventDefault()
        // this.props.clearState()
        this.setState({hidden:false})
    }

    componentDidMount(){
        this.getLoggedInUser()
    }
    getLoggedInUser(){
    const loggedUser = JSON.parse(localStorage.getItem("user"));
      if(loggedUser){
          this.setState({user:loggedUser})
          this.props.getNotifications(loggedUser.kennel_id)
      }
      else{
        this.props.history.push('/')
      }
    }
    render() {
        return (
            <div>
            {!this.state.user ? <h1>Loading</h1>:
             (<Dashboard 
                showModal = {this.showModal}
                messages={this.props.messages}
                user={this.state.user}
                {...this.props}/>)
              }
                {this.state.hidden ? null :
                    <AddDogModal 
                    closeModal ={this.closeModal}
                    closeModal ={this.closeModal}
                    addDog={this.props.addDog}
                    getBreeds={this.props.getBreeds}
                    user={this.state.user}
                    breeds={this.props.breeds}
                    addBreed={this.props.addBreed}
                    newBreed={this.props.newBreed}
                    loading={this.props.loading}
                    success={this.props.success}
                    />
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    messages:state.auth.messages,
    breeds:state.auth.breeds,
    newBreed: state.auth.newBreed,
    loading: state.auth.loading,
    success: state.auth.success,

})

const mapDispatchToProps = dispatch=> {
    return{
       getNotifications: (id) => dispatch(actions.admins.getNotifications(id)),
       addDog: (dog,breeds) => dispatch(actions.admins.addDog(dog,breeds)),
       getBreeds: () => dispatch(actions.admins.getBreeds()),
       addBreed: (breed) => dispatch(actions.admins.addBreed(breed)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)

