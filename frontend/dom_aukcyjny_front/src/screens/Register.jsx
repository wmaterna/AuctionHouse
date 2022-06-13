import React from 'react';
import {useState, useEffect} from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@material-ui/core';
import {register} from './requests/register';
import {useHistory} from 'react-router-dom'
import {withRouter} from 'react-router';
import Typography from '@mui/material/Typography';



function Register(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [status, setStatus] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    const handleRegister = () => {
        if(password2 === password){
            register(name, email, password, setStatus, setLoading, setError)
        }else {
            setError("Passwords do not match")
        }
    }
    useEffect(() => {
        if(status){
            history.push("/gallery");
        }
    },[status])
    return(
        <div>
       <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
                   {error && 
            <Typography variant="body2" color="text.secondary">
                {error}
            </Typography>}
          <Grid item xs={12}>
            <TextField label="e-mail" onChange={e => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Name" onChange={e => setName(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" onChange={e => setPassword2(e.target.value)} type={'password'}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" onChange={e => setPassword(e.target.value)} type={'password'}></TextField>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleRegister} disabled={email=== "" || password === "" || password2 === ""}> Register </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
   </div>
    )
}
export default Register;