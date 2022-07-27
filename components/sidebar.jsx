import React, { Component } from 'react'
import chatStyles from '../styles/chat.module.css'

export default class SideBar extends Component{
    render(){
        return(
            <div className={chatStyles.sidebarWrapper}>
                <span><p>#Connected User</p></span>
                <span><p>#Connected User</p></span>
                <span><p>#Connected User</p></span>
            </div>
        )
    }
}