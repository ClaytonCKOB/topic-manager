import LogoutIcon from "@mui/icons-material/Logout";
import AuthService from "../../services/AuthService";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const authService = new AuthService();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    };

    return  <Box display="absolute" top={0} right={0} mb={2}>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        zIndex: 10
                    }}
                >
                    Sair
                </Button>
            </Box>;
}