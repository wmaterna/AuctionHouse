import {getUserToken} from "./userLogginStatus";
import {getBestBet} from "./get-best-bet"
export const getPrice = (setPrice, userId, artId, setLoading, setError, setWinner) =>{
    setLoading(true);
    const token = getUserToken();
    fetch(
        `/api/arts/bet-price`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                user: userId,
                art: artId
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
            getBestBet(artId, userId, setWinner, setLoading, setError)
            setPrice(data.data[0].price)
        } else {
           setError(data.error)
        }
    })
    .catch((error) => {
        setError(error)
    })
    .finally(() => {
        setLoading(false);
    })
}