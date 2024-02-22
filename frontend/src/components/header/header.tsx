/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Button, Container } from "@mui/material";
import {  ExitToApp } from "@mui/icons-material";
import './header.css';
import { logout } from "../../services/auth.service";
import { get } from "../../services/storage.service";

const Header = () => {
  
  
  return (
    <AppBar position="relative" color="transparent" style={{ backgroundColor: "var(--header-bg-color)", marginBottom: 30 }}>
      <Container maxWidth="lg" className="header">
        <h1>Synvia Task Manager</h1>
        { 
          get('isLoggedIn') && <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <Button variant="text" sx={{backgroundColor: "var(--header-bg-color)"}} color="inherit" onClick={() => {logout(); window.location.reload()}}><ExitToApp style={{ fontSize: 32 }} /></Button>
          </div>
        }
      </Container>
    </AppBar>
  );
};

export default Header;