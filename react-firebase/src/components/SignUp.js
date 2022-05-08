import React, { useRef, useState } from "react"
import { auth } from "../utils/firebase.config"

const SignUp = () => {
  const registerEmail = useRef("")
  const registerPassword = useRef("")
  const [displayName, setDisplayName] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    try {
      auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          })
          console.log(userAuth)
          window.location.reload()
        })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="signup-container">
      <div className="signup">
        <h3>S'inscrire</h3>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="pseudo"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="email"
            ref={registerEmail}
          />
          <input
            type="password"
            required
            placeholder="password"
            ref={registerPassword}
          />
          <input type="submit" value="valider l'inscription" />
        </form>
      </div>
    </div>
  )
}

export default SignUp
