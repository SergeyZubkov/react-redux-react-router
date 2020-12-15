import {useState, useEffect, useContext, createContext} from 'react';
import errorMsgHandler from './errorMsgHandler'

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState(null)

    const signin = (email, password, cb) => {
        fetch(
            "https://mysterious-reef-29460.herokuapp.com/api/v1/validate", 
            {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(
                    {email, password}
                )
            }
        )
        .then(res => res.json())
        .then(res => {
            const {status} = res;
            if (status === 'ok') {
                setUserId(res.data.id);
                cb()
            }
            if (status === 'err') {
                setError(errorMsgHandler(res.message))
            }
        })
        .catch(err => console.log(err))
    }

    const signout = (cb) => {
        setUserId(null)
        
        if(cb) cb()
    }

    return {
        userId,
        error,
        signin,
        signout
    }
}