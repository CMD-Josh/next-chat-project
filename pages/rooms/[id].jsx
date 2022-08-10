import React, { Component } from 'react'
import SideBar from '../../components/sidebar'
import Message from '../../components/message'
import chatStyles from '../../styles/chat.module.css'
import prisma from '../../lib/prisma'
import { io } from 'socket.io-client'

let socket

const client = prisma

class ChatRoom extends Component{
    
    constructor(props){
        super(props)
        let msgs = props.messages

        this.state = {
            messageComponents: [],
            connectedUsers: [],
            nickname: ""
        }

        for(var i = 0; i < msgs.length; i++){
            this.state.messageComponents.push(React.cloneElement(<Message key={msgs[i].id} />, msgs[i]))
        }
    }
    
    render(){
        return(
            <div className={["border-bottom"]}>
                <nav>
                    <h2>Room ID: {this.props.id}</h2>
                </nav>
                <div>
                    <div id='chatMessages' className={chatStyles.messageWrapper}>
                        {this.state.messageComponents}
                    </div>

                    <div className={chatStyles.inputWrapper}>
                        <input id='inputElement' type="text" className='w-100 border-0 px-2' />
                    </div>
                </div>

                <SideBar users={this.state.connectedUsers} />
            </div>
        )
    }

    componentDidMount(){
        this.SocketInit()
        this.initInputField()
        this.scrollToBottom()

        if(typeof window !== 'undefined'){
            let search = window.location.search
            let params = new URLSearchParams(search)

            this.state.nickname = params.get('name')
        }else{
            this.state.nickname = ''
        }

    }

    componentDidUpdate(){
        this.scrollToBottom()
    }

    initInputField = () => {
        const inputElem = document.getElementById('inputElement')

        inputElem.addEventListener('keypress', (e) => {
            if(e.key === 'Enter' && inputElem.value.length > 0){
                socket.emit('client-message', inputElem.value, this.state.nickname, this.props.id)
                inputElem.value = ''
            }
        })
    }

    SocketInit = async() => {
        await fetch('../api/roomSocket')

        socket = io()
        socket.on('connect', () => {
            socket.emit('syn-ack', this.props.id, this.state.nickname)
        })

        socket.on('message', (data) => {
            this.addMessage(data)
        })

        socket.on('update-client-listing', (nicks) => {
            this.setState({
                connectedUsers: nicks
            })
        })
    }

    addMessage = (props) => {
        let msgs = this.state.messageComponents
        msgs.push(React.cloneElement(<Message key={props.id}/>, props))

        this.setState({
            messageComponents: msgs
        })
    }

    scrollToBottom = () => {
        const chatElem = document.getElementById('chatMessages')
        chatElem.scrollTop = chatElem.scrollHeight
    }
}

export async function getServerSideProps(context){

    let id = context.params.id

    const messages = await client.messages.findMany({
        where: {
            roomID: context.params.id
        }
    })

    messages.map(msg => {
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