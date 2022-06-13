import {setUserLoggedIn} from './userLogginStatus';



export const logUser = (email, password, setStatus, setLoading, setError) =>{
    setLoading(true);
    fetch(
        `/api/user/signin`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )
    .then((response) => {
        const data = response.json();
        const res = response.status;
        return Promise.all([res, data])
    })
    .then(([res, data]) => {
        if( res === 200){
            setUserLoggedIn(data.data.user_id, data.token)
            setStatus(true);
            console.log(data)
        } else {
            setError(data.error)
        }
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        setLoading(false);
    })
}