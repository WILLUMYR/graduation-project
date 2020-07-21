import React from 'react'
import { Link } from 'react-router-dom';


export default function Login() {
  return (
    <>
      <section>
        <h1>Are you a user?</h1>
        <Link className="" to="/login/user">Login As User</Link>
      </section>
      <section>
        <h1>Are you an employee?</h1>
        <Link className="" to="/login/employee">Login As An Employee</Link>
      </section>
      <div>
        <p>Go back home</p>
        <Link className="" to="/">home</Link>
      </div>
    </>
  )
}
