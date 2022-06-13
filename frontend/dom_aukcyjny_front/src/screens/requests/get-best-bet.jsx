import {getUserToken} from "./userLogginStatus";
export const getBestBet = (artId, userId, setWinner, setLoading, setError) =>{
    setLoading(true);
    const token = getUserToken();
    fetch(
        `/api/arts/my-bet-best`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                 "x-access-token": token
            },
            body: JSON.stringify({
                piece: artId
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
            console.log(userId == data.data[0].user_id)
            if(userId == data.data[0].user_id){
                setWinner(true);
            } else {
                setWinner(false)
            }
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