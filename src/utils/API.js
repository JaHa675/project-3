// IMPORTANT NOTE you gotta run the backend on localhost 3001 to make the dev environment work once it's deployed we swap these two things here

//DEVELOP
const BASE_URL="http://localhost:3001"
//PROD
// const BASE_URL="https://battle-trail-backend.herokuapp.com"


export default {
    getAllUsers:async ()=>{
        const res = await fetch(`${BASE_URL}/api/users`)
        return await res.json()
    },
    getOneUser:async userId=>{
        const res = await fetch(`${BASE_URL}/api/users/${userId}`)
        return await res.json()
    },
    verify:async token=>{
        const res = await fetch(`${BASE_URL}/api/users/verifyToken`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return await res.json()
    },
    login:async userData=>{
        try {
            const res = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return await res.json()
        } catch (err) {
            console.log(err)
        }
    },
    signup:async userData=>{
        try {
            const res = await fetch(`${BASE_URL}/api/users`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return await res.json()
        } catch (err) {
            console.log(err)
        }
    },
    getAllCharacters:async ()=>{
        const res = await fetch(`${BASE_URL}/api/characters`)
        return await res.json()
    },
    getOneCharacter:async charId=>{
        const res = await fetch(`${BASE_URL}/api/characters/${charId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json()
    },
    createCharacter:async (gameData,token)=>{
        const res = await fetch(`${BASE_URL}/api/characters`, {
            method: "POST",
            body: JSON.stringify(gameData),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        return await res.json()
    }
}
