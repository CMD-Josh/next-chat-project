import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import indexStyles from '../styles/index.module.css'
import Router from 'next/router'

export default function Home(){
  return(
    <>
    <Head>
      <title>Home Page</title>
    </Head>
    <main>
      <div className={utilStyles.homePageWrapper}>
        <div className='col-4'/>
          <div className='row justify-content-center'>

            <div id='alertElem' className='text-center mx-0 mb-4 alert alert-danger invisible' role="alert">
              <p>Error</p>
            </div>

            <div className="p-5 pb-5 container border bg-light text-center row">
              <h3 className='mb-3'>Enter chat room</h3>
              <form onSubmit={disruptEvent}>
                <input type="text" placeholder='Room ID' className='form-control mb-3' id='roomID'></input>
                <input type="text" placeholder='Nickname' className='form-control mb-4' id='nick'></input>
                <input className={["btn btn-secondary mt-2 w-50", indexStyles.borderFlatRight].join(" ")} type="submit" value="Enter"/>
                <input onClick={createRoom} className={["btn btn-primary mt-2 w-50", indexStyles.borderFlatLeft].join(" ")} type="button" value="Create Room"/>
              </form>
            </div>
          </div>
        <div className='col-4'/>
      </div>
    </main>
    </>
  )
}

const disruptEvent = async(event) =>{
  event.preventDefault()
  let roomID = document.getElementById('roomID').value
  let nick = document.getElementById('nick').value
  enterRoom(roomID, nick)
}

const enterRoom = async (ID, nick) => {
  if(ID.length && nick.length){
    const res = await fetch('./api/joinRoom', {
      method: 'POST',
      body: JSON.stringify({
        id: ID,
        name: nick
      })
    })
    
    const result = await res.json()
  
    if(result["room"] !== undefined){

      Router.push({
        pathname: './rooms/' + result["room"],
        query: {
          name: nick
        }
      })
      
    }else{
      displayError(result["error"])
    }
  }else{
    if(!ID.length) displayError("Enter valid room ID.")
    if(!nick.length) displayError("Enter Nickname.")
  }
}

const createRoom = async() =>{
  let nick = document.getElementById('nick').value

  if(nick.length){
    const res = await fetch('./api/createRoom', {
      method: 'POST'
    })
    
    const result = await res.json()

    enterRoom(result["Room"], nick)
  }else{
    displayError("Enter nickname.")
  }
}

const displayError = e => {
  const alertElem = document.getElementById("alertElem")
  alertElem.classList.remove("invisible")
  alertElem.firstElementChild.innerHTML = e
}