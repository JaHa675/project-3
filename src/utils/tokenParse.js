import decode from 'jwt-decode';

export default function parseJwt(token) {
    if(!localStorage.getItem('token')){
    return
    }
        try {
            const data = decode(token,{header:true});
            // valid token format
            return JSON.parse(data);
        } catch(error) {
            // invalid token format
            console.log(error);
        }

}
