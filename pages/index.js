import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

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
          <form onSubmit={enterRoom}>
            <input type="text" placeholder='Room ID' className='form-control mb-3' id='roomID'></input>
            <input type="text" placeholder='Nickname' className='form-control mb-4'></input>
            <input className="btn btn-primary container-fluid mt-2" type="submit" value="Enter"/>
          </form>
        </div>
        <div className='col-4'/>
      </div>
    </main>
    </>
  )
}

const enterRoom = async (event) => {
  event.preventDefault()
  let roomID = document.getElementById('roomID').value
  if(roomID){
    location.href = '/rooms/' + roomID
  }
  return false;
}