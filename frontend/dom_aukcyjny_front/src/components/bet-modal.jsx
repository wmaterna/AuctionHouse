import * as React from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import {makeBet} from "../screens/requests/make-bet";

export default function BetModal(props) {
    const userId = props.userId;
    const [price, setPrice] = useState();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleClick = () => {
        makeBet(props.userId, props.pieceId, price, setStatus, setLoading, setError);
        props.setModalOpen(false)
    }

    useEffect(() => {
        setError("")
    },[price])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return (
    <Modal
        open={props.openModal}
        // onClose={props.onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Make a bet
            </Typography>
            {error && 
            <Typography variant="body2" color="text.secondary">
                {error}
            </Typography>}
            <Input placeholder="value" onChange={(e)=>setPrice(e.target.value)}></Input>
            <div style={{display: "flex", flexDirection: "row"}}>
            <Button onClick={() => props.setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleClick} disabled={price === undefined}>Sumbit</Button>
            </div>
            
        </Box>
</Modal>
  );
}