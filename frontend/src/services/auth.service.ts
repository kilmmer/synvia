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
    }).then(res => res.json()).then((data) => {
        refreshToken()
        return data
    })

    return res
}

const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    
    clearInterval(interval)
}

const refreshToken = async () => {
    interval = setInterval(async () => {
        console.log('refreshToken called')
        const user = localStorage.getItem('user');
    
        if(user !== null){
            await fetch('http://localhost:3000/api/v1/auth/refresh-token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: user['refreshToken']
                })
            }).then(res => res.json()).then((data) => {
                return data
            })
        }
    }, 5 * 1000)
}

const register = async (data: any) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then((data) => {
        refreshToken()
        return data
    })

    return res
}


export {
  login,
  logout,
  register,
  refreshToken
}