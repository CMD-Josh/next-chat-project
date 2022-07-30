import React, { Component } from 'react'
import SideBar from '../../components/sidebar'
import Message from '../../components/message'
import chatStyles from '../../styles/chat.module.css'
import prisma from '../../lib/prisma'

const client = prisma

class ChatRoom extends Component{
    render(){
        return(
            <div className={["border-bottom"]}>
                <nav>
                    <h2>Room ID: {this.props.id}</h2>
                </nav>
                <div>
                    <div className={chatStyles.messageWrapper}>
                        {this.props.messages.map(msg => {
                            return React.cloneElement(<Message key={msg.id}/>, msg)
                        })}
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
    const messages = await client.messages.findMany({
        where: {
            roomID: context.params.id
        }
    })

    console.log(messages)
    messages.map(msg => {
        console.log(msg.posted.getTime())
        msg.posted = msg.posted.getTime()
    })

    return {
        props : {
            id,
            messages
        }
    }
}

export default ChatRoom;