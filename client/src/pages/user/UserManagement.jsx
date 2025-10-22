import { 
  Box, Typography, Button
} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UserModal from "../user/UserModal";
import AuthService from "../../services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
    const [openUserModal, setOpenUserModal] = useState(false);
    const navigate = useNavigate();

    const authService = new AuthService();

    return <>
    <Box mt={3}>
        <Box
        sx={{
            backgroundColor: "#e3e9f0",
            borderRadius: 2,
            px: 3,
            py: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            transition: "0.2s",
            width: 0.2
        }}
        >
        <Typography variant="h5" fontWeight="bold">
            Gerenciar {authService.isAdmin() ? "Perfis" : "Perfil"}
        </Typography>
        <Typography mt={2} variant="subtitle1" color="text.secondary" gutterBottom>
            {authService.isAdmin() ? "Visualize e edite as informações dos usuários do sistema." : "Visualize e edite suas informações pessoais e de acesso."}
        </Typography>
        <Button
            variant="contained"
            color="primary"
            startIcon={<ManageAccountsIcon />}
            onClick={() => {if (!authService.isAdmin()) {setOpenUserModal(true);} else {navigate("/user/list");}}}
            sx={{
            borderRadius: 2,
            alignSelf: "center",
            textTransform: "none",
            py: 1,              
            px: 2,      
            marginTop: 2,
            width: 0.9          
            }}
        >
            Ir Para {authService.isAdmin() ? "Lista de Usuários" : "Meu Perfil"}
        </Button>
        </Box>
    </Box>

    <UserModal
        openUserModal={openUserModal}
        setOpenUserModal={setOpenUserModal}
    />
    </>;
}