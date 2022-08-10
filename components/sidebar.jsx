import React, { Component } from 'react'
import chatStyles from '../styles/chat.module.css'

export default class SideBar extends Component{
    render(){
        return(
            <div className={chatStyles.sidebarWrapper}>
                {this.props.users.map(elem => {
                    return React.cloneElement(<ConnectedUser key={elem}/>, {name: elem})
                })}
            </div>
        )
    }
}

class ConnectedUser extends Component{
    render(){
        return(
            <span><p>{this.props.name}</p></span>
        )
    }
}