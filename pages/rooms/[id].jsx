import React, { Component } from 'react'
import SideBar from '../../components/sidebar'
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
                        <p className='px-2'>#Message</p>
                    </div>

                    <div className={chatStyles.inputWrapper}>
                        <p className='mb-0 border-top'>#Input field</p>
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