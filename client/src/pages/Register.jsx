import React from 'react'
import {Form} from 'antd'
function Register() {
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='w-400 card p-3'>  
        <h1 className='text-lg'>SV Bus - Register</h1>
        <hr />
        <Form layout='vertical'>
          <Form.Item label='Name'>
            <input type='text' />
          </Form.Item>
          <Form.Item label='Email'>
            <input type='text' />
          </Form.Item>
          <Form.Item label='Password'>
            <input type='text' />
          </Form.Item>
        </Form>

        <div className="d-flex justify-content-between">
          <button className="secondary-btn">Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register