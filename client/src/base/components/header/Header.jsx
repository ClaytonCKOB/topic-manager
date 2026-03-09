import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
  Divider,
  ListItemIcon
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const authService = new AuthService();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const userName = authService.getName();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        mb: 3
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
          }}
        >
          Topic Manager
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)"
              }
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              {getInitials(userName)}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Conectado como
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ mt: 0.5 }}>
              {userName}
            </Typography>
          </Box>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.5,
              px: 2,
              color: "error.main",
              "&:hover": {
                backgroundColor: "error.lighter"
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2">Sair</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
