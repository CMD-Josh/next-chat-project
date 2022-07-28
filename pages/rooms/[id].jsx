import React, { Component } from 'react'
import SideBar from '../../components/sidebar'
import Message from '../../components/message'
import chatStyles from '../../styles/chat.module.css'

class ChatRoom extends Component{
    render(){
        return(
            <div className={["border-bottom"]}>
                <nav>
                    <h2>Room ID: {this.props.id}</h2>
                </nav>
                <div>
                    <div className={chatStyles.messageWrapper}>
                        <Message />
                    </div>

                    <div className={chatStyles.inputWrapper}>
                        <input type="text" className='w-100 border-0 px-2' />
                    </div>
                </div>

                <SideBar />
            </div>
        )
    }
}

export async function getServerSideProps(context){

    let id = context.params.id

    return {
        props : {id}
    }
}

export default ChatRoom;