export const setUserLoggedIn = (userId, token) => {
    localStorage.setItem('userId', userId)
    localStorage.setItem('JWT_token', token)
}
export const checkIfUserLoggedIn = () => {
    const user = localStorage.getItem('userId');
    const token = localStorage.getItem('JWT_token');
    if(user && token){
        return true
    }else {
        return false
    }
}
export const setUserLoggedOut = () => {
    localStorage.clear();
}
export const getUserId = () => {
    if(setUserLoggedIn){
        return localStorage.getItem('userId')
    } else {
        return 'not found';
    }
    
}

export const getUserToken = () => {
    if(setUserLoggedIn){
        return localStorage.getItem('JWT_token')
    } else {
        console.log("Token not found")
        return 'Token not found'
    }
}