import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation} from "react-router-dom";
import logo from '../res/logo.jpg'; 

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <AppBar position="sticky" sx={{bgcolor: '#3399ff'}}>
            <Toolbar>
                <Avatar  sx={{ width: 40, height: 40}} alt="Logo" src={logo} />
                <Typography variant="h6" color="inherit" sx={{mt:1.5, mb:1, ml: 1, flexGrow: 1}} noWrap>
                    {props.page}
                </Typography>
                <Tooltip title="home" arrow>
                    <IconButton size="large" onClick={() => location.pathname != "/home" ? navigate("/home") : {}}>
                        <HomeIcon fontSize="inherit" sx = {{mt: 1, color: "white"}}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="stations" arrow>
                    <IconButton size = "large" onClick={() => location.pathname != "/stations" ? navigate("/stations") : {}}>
                        <LocationOnRoundedIcon  fontSize="inherit" sx = {{mt: 1, color: "white"}}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="profile" arrow>
                    <IconButton size="large" onClick={() => location.pathname != "/profile" ?  navigate("/profile") : {}}>
                        <AccountCircleIcon fontSize="inherit" sx = {{mt: 1, color: "white"}}/>
                    </IconButton>
                </Tooltip>
            </Toolbar> 
        </AppBar>
    );
 }
 
 export default Header;