import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

export default function Home(){
  return(
    <>
    <Head>
      <title>Home Page</title>
    </Head>
    <main>
      <div className={utilStyles.homePageWrapper}>
        <div className="p-5 md-col-6 container border bg-light text-center">
          <h3 className='mb-3'>Enter chat room</h3>
          <div className='input-group'>
            <input type="text" placeholder='Room ID' className='form-control'></input>
            <input type="text" placeholder='Nickname' className='form-control'></input>
            <div className='input-group-append'>
              <button className="btn btn-outline-primary" type="button" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: -1}}>Enter</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}