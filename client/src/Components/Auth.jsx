import React, { useState } from 'react'
import axios from "axios"
import Cookies from "universal-cookie"

import signInImage from "../assets/signup.jpg"

const initialState = {
  fullName: "",
  userName: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  profileURL: ""
}

const cookies = new Cookies();
const Auth = () => {

  const [isSignup, setSignup] = useState(false)
  const [form, setForm] = useState(initialState)
  const API = axios.create({ baseURL: "https://mychatter-webapp.herokuapp.com" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password, phoneNumber, profileURL } = form;

    const { data: { token, userId, hashedPassword, fullName } } = await API.post(`${isSignup ? "/signup" : "/signin"}`, { userName, password, fullName: form.fullName, phoneNumber, profileURL })
    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("fullName", fullName);
    cookies.set("userName", userName);
    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber)
      cookies.set("profileURL", profileURL)
      cookies.set("hashedPassword", hashedPassword)

    }
    window.location.reload();
  }
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })


  }

  const switchMode = () => {
    setSignup((previous) => (
      !previous
    ))

  }
  return (
    <div className="auth__form-container">
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit} method="post">
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input name="fullName"
                  type="text"
                  placeholder="full name"
                  onChange={handleChange}
                  required />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">UserName</label>
              <input name="userName"
                type="text"
                placeholder="user name"
                onChange={handleChange}
                required />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="profileURL">Profile Picture URL</label>
                <input name="profileURL"
                  type="text"
                  placeholder="Profile URL"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>

            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>

      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="sign in" />
      </div>

    </div>
  )
}

export default Auth