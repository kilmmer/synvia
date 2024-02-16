/* eslint-disable @typescript-eslint/no-explicit-any */
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
        console.log(data)
        return data
    })

    return res
}

const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    
}

const register = async (data: any) => {
    const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then((data) => {
        return data
    })

    return res
}


export {
  login,
  logout,
  register
}