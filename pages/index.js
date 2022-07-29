import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import indexStyles from '../styles/index.module.css'

export default function Home(){
  return(
    <>
    <Head>
      <title>Home Page</title>
    </Head>
    <main>
      <div className={utilStyles.homePageWrapper}>
        <div className='col-4'/>
        <div className="p-5 pb-5 container border bg-light text-center">
          <h3 className='mb-3'>Enter chat room</h3>
          <form onSubmit={disruptEvent}>
            <input type="text" placeholder='Room ID' className='form-control mb-3' id='roomID'></input>
            <input type="text" placeholder='Nickname' className='form-control mb-4'></input>
            <input className={["btn btn-secondary mt-2 w-50", indexStyles.borderFlatRight].join(" ")} type="submit" value="Enter"/>
            <input onClick={createRoom} className={["btn btn-primary mt-2 w-50", indexStyles.borderFlatLeft].join(" ")} type="button" value="Create Room"/>
          </form>
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
  enterRoom(roomID)
}

const enterRoom = async (ID) => {
  if(ID.length){
    const res = await fetch('./api/joinRoom', {
      method: 'POST',
      body: JSON.stringify({
        id: ID
      })
    })
    
    const result = await res.json()
  
    if(result["room"] !== null){
      location.href = './rooms/' + result["room"]
    }
  }
}

const createRoom = async() =>{
  const res = await fetch('./api/createRoom', {
    method: 'POST'
  })
  
  const result = await res.json()

  enterRoom(result["Room"])
}