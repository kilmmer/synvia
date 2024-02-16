/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Button, Container } from "@mui/material";
import { AccountCircleOutlined, ExitToApp } from "@mui/icons-material";

import './header.css';
import { Context } from "../../context/context";
import { useContext } from "react";
import { logout } from "../../services/auth.service";



const Header = () => {
  const {context, setContext } = useContext(Context)
  console.log(context)
  return (
    <AppBar position="relative" color="transparent" style={{ backgroundColor: "var(--header-bg-color)", marginBottom: 30 }}>
      <Container maxWidth="lg" className="header">
        <h1>Synvia Task Manager</h1>
        
          { context.isLoggedIn &&
              (<div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <AccountCircleOutlined style={{ fontSize: 32 }} />
              <p>{context?.user.name}</p>
              <Button variant="text" sx={{backgroundColor: "var(--header-bg-color)"}} color="inherit" onClick={() => {logout(); setContext(null)}}><ExitToApp style={{ fontSize: 32 }} /></Button>
            </div>)
          }
    
      </Container>
    </AppBar>
  );
};

export default Header;