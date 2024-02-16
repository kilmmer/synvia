import { AppBar, Container } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";

import './header.css';

const Header = (props: {user: string}) => {
  return (
    <AppBar position="relative" color="transparent" style={{ backgroundColor: "var(--header-bg-color)", marginBottom: 30 }}>
      <Container maxWidth="lg" className="header">
        <h1>Synvia Task Manager</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <AccountCircleOutlined style={{ fontSize: 32 }} />
          <p>{props.user}</p>
        </div>
    
      </Container>
    </AppBar>
  );
};

export default Header;