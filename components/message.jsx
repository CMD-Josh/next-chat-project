import React, { Component } from 'react'
import chatStyles from '../styles/chat.module.css'

class Message extends Component{

    render(){
        return(
            <div className={['m-2 w-75', chatStyles.messageContainerRecieved].join(" ")}>
                <p className='mx-2 small'>{this.props.nickname}</p>
                <div className=' px-2 py-1 border bg-light'>
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
}

export default Message