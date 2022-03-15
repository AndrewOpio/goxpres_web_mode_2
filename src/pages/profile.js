import React from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/header';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import {Typography, CardContent, Stack, TextField, Button, Box, Divider, Link,
Badge, Alert} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="https://goxpres.com/">
          goxpres
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const theme = createTheme();

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      width: 10,
      height: 10,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '110%',
        height: '110%',
        borderRadius: '60%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
function Profile(props){
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [type, setType] = React.useState('agent');
    const [severity, setSeverity] = React.useState('success');

    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [location, setLocation] = React.useState('');

    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
       setLastName(event.target.value);
    };
    const handleEmailChange = (event) => {
       setEmail(event.target.value);
    };
    const handleContactChange = (event) => {
        setContact(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
        

    React.useEffect(() => {
        axios.post('http://localhost/gxpres/get_profile', {
            id: 1,
            type: type,
        })
        .then(function (response) {
            if (response.data.details[0] != false) {
               setFirstName(response.data.details[0].first_name);
               setLastName(response.data.details[0].last_name);
               setEmail(response.data.details[0].email);
               setContact(response.data.details[0].contact);
               setLocation(response.data.details[0].location);

            } else {
                setText("An error occured, please try again.");
                setSeverity("error");     
                setOpen(true);     
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        if(data.get('fname') && data.get('lname') && data.get('email') && data.get('contact')){

            var x = data.get('contact');
            let isnum = /^\d+$/.test(x);

            if (x.charAt(0)!='0' || x.charAt(1)!='7' || x.length != 10 || isnum == false) {
                setText("Please enter a valid contact");
                setSeverity("error");     
                setOpen(true);     

            } else {
                var location = "nvm";
                var pass1 = 'nvm';
                var pass2 = 'nvm';  

                if (data.get('password1')) {
                    if (data.get('password2') && (data.get('password2') == data.get('password3'))) {
                        pass1 = data.get('password1');
                        pass2 = data.get('password2');  

                    } else {
                        setText("Password error");
                        setSeverity("error");     
                        setOpen(true);     
                        return
                    }

                } else if (data.get('password2') || data.get('password3')){
                    setText("Password error");
                    setSeverity("error");     
                    setOpen(true);     
                    return
                }
                
                if (type == 'agent') {
                    if (data.get('location')) {
                        location = data.get('location');

                    } else {
                        setText("Enter all required fields");
                        setSeverity("error");     
                        setOpen(true);   
                        return              
                    }
                }

                axios.post('http://localhost/gxpres/edit_profile', {
                    id: 1,
                    fname: data.get('fname'),
                    lname: data.get('lname'),
                    email: data.get('email'),
                    contact: data.get('contact'),
                    location:  location,
                    password1: pass1,
                    password2: pass2,
                })
                .then(function (response) {
                    console.log(response);

                    if (response.data.details[0] != false) {
                        setText("Details updated successfully.");
                        setSeverity("success");     
                        setOpen(true);     

                    } else {
                        setText("An error occured, please try again.");
                        setSeverity("error");     
                        setOpen(true);     
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }
        } else {
            setText("Enter all required fields");
            setSeverity("error");     
            setOpen(true);     
        }
    };
    

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header page = "Profile"/>
            <Stack 
               direction="column"                 
               alignItems="center"
               justifyContent="center"
               spacing={2}
               sx={{pt: 2, pb: 4}}
               >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{width: 100, height: 100}}/>
                </StyledBadge>
                <Typography variant="h5">
                    {first_name + "     " + last_name}
                </Typography>
                <Card>
                    <CardContent>
                        <Collapse in={open}>
                            <Alert
                                variant="filled" 
                                severity={severity}
                                action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                    setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                                }
                            >
                                {text}
                            </Alert>
                        </Collapse>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="fname"
                                        label="First Name"
                                        name="fname"
                                        value={first_name}
                                        onChange={handleFirstNameChange}
                                        autoComplete="fname"
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lname"
                                        label="Last Name"
                                        name="lname"
                                        value={last_name}
                                        onChange={handleLastNameChange}
                                        autoComplete="lname"
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        autoComplete="email"
                                    />                            
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="contact"
                                        label="Contact"
                                        name="contact"
                                        value={contact}
                                        onChange={handleContactChange}
                                        autoComplete="contact"
                                    />                            
                                </Grid>
                            </Grid>
                            <Grid>
                                {type == "agent"?
                                <Grid item xs={12}>
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                    value={location}
                                    onChange={handleLocationChange}
                                    autoComplete="location"
                                    /> 
                                </Grid>: <></>}
                            </Grid>
                            <Typography sx = {{mt:3}}>
                                Change Password
                            </Typography>
                            <Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password1"
                                        label="Old Password"
                                        type="password"
                                        name="password1"
                                        autoComplete="password1"
                                    />                            
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password2"
                                        label="New Password"
                                        type="password"
                                        name="password2"
                                        autoComplete="password2"
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password3"
                                        label="Confirm Password"
                                        type="password"
                                        name="password3"
                                        autoComplete="password3"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: '#3399ff'}}
                            >
                            Save Changes
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
            {/* Footer */}
            <Box sx={{ p: 6 }} component="footer">
                <Divider>
                   <Chip label="GoXpres" color="primary"/>
                </Divider>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p" sx = {{mt: 1 }}>Moving the easy way!</Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Profile;