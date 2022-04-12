import React from 'react'

function LoginClient() {
  return (
      <div className='input-page'>
          <div className='log-in-div'>
              <input type="text" placeholder='Uniqe Name' className='login-handle' />
              <input type="text" placeholder='Whatssapp Number' className='login-handle' />
              <button className='login-enter-btn'>Login Or Register</button>
          </div>
    </div>
  )
}

export default LoginClient