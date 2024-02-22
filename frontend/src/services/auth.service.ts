import { get, remove, set } from "./storage.service";

/* eslint-disable @typescript-eslint/no-explicit-any */
let interval: any;

const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json()).then((response) => {
        if(response.statusCode === 200){
            return response.data
        } else {
            return response
        
        }
        
    })

    return res
}

const logout = () => {
    clearInterval(interval)
    remove('access_token')
    remove('user')
    remove('isLoggedIn')
    
}

const refreshToken = () => {    
    interval = setInterval(async () => {
       
        const user = get('user');
        let userDecoded: any;
        
        if(user !== null){
            userDecoded = JSON.parse(user)
        }
    
        if(user !== null){
            await fetch('http://localhost:3000/api/v1/auth/refresh-token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh_token: userDecoded['refresh_token']
                })
            }).then(res => res.json()).then((response) => {
                console.log(response)
                if(response.statusCode === 200){
                    set('isLoggedIn', true)
                    set('user', JSON.stringify(response.data))
                    set('access_token', response.data.access_token)
                    return response.data
                } else {
                    logout()
                    window.location.reload()
                    return response
                }
            })
        }
    }, 14 * 1000)
}

const register = async (data: any) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then((response) => {
        if(response.statusCode === 200){
            return response.data
        } else {
            return response
        }
    })

    return res
}


export {
  login,
  logout,
  register,
  refreshToken
}