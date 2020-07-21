import React from 'react'

export default function PatientLogin() {
  return (
    <form action="">
      <input placeholder="Username" type="text" />
      <br />
      <input placeholder="Password" type="password" />
      <br />
      <select name="Select Gender" id="">
        <option value="none">Gender: neither / rather not say</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <br />
      <input placeholder="Email (optional)" type="text" />
    </form>
  )
}
