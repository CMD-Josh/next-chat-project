import React, { Component } from 'react'

class ChatRoom extends Component{
    render(){
        return(
            <React.Fragment>
                <h1>Room ID: {this.props.id}</h1>
            </React.Fragment>
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