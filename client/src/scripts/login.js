import React, {useState,useEffect} from 'react'
import Login from "../components/pages/Login"
import {login} from "../utils/API"


export default function UserLoginInfo(e) {
    e.preventDefault();

    const userObj = {
        user_name: document.querySelector("#battleNameInput").value,
        password: document.querySelector("#passwordInput").value,
    }
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
        login(userObj)
        .then(
          (result) => {
            console.log(result);
            window.location= "/main"
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // setIsLoaded(true);
            // setError(error);
            console.log(error)
          }
        )
  }
