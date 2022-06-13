import {getUserToken} from "./userLogginStatus";
export const getBets = (user, setMyBets, setLoading, setError) =>{
    setLoading(true);
    const token = getUserToken();
    fetch(
        `/api/arts/my-bets`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                user: user,
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
            setMyBets(data.data);
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