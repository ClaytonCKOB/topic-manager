import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import ErrorMessage from "../../base/components/message/ErrorMessage";

export default function UserModal({ openUserModal, setOpenUserModal, userId }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [isCreation, setIsCreation] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const userService = new UserService();

    const getUser = async () => {
        setLoading(true);
        try {
            const data = await userService.getUser(userId);
            setUser(data || {});
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (openUserModal && userId) {
            getUser();
        } else {
            setUser({});
        }
        setIsCreation(userId == null || userId == 0);
    }, [openUserModal, userId]);

    const handleSaveChanges = async () => {
        try {
            if (isCreation) {
            await userService.create(user);
            } else {
                await userService.update(user);
            }
            setOpenUserModal(false);

        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: "Erro ao salvar usuário.",
                severity: "error",
            });
        }
    };

    const handleCancelUserChange = () => setOpenUserModal(false);

    return (
    <Dialog open={openUserModal} onClose={handleCancelUserChange} fullWidth maxWidth="sm">
        <DialogTitle sx={{backgroundColor: "#cfd8dc", marginBottom: 3, fontWeight: 550}}>{isCreation ? "Criar Novo Usuário" : "Gerenciar Perfil"}</DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Username
                    </Typography>
                    <TextField 
                        fullWidth 
                        disabled={!isCreation} 
                        value={user.username || ""} 
                    />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Função
                    </Typography>
                    <TextField fullWidth disabled={!isCreation} value={user.role || ""} />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Nome
                    </Typography>
                    <TextField
                        fullWidth
                        value={user.name || ""}
                        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    E-mail
                    </Typography>
                    <TextField
                        fullWidth
                        value={user.email || ""}
                        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                    />
                </Box>
            </Box>
        </DialogContent>
        <DialogActions mt={3}>
            <Button onClick={handleCancelUserChange} color="inherit">
                Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary" variant="contained" disabled={loading}>
                Salvar
            </Button>
        </DialogActions>
        <ErrorMessage
            snackbar={snackbar}
            setSnackbar={setSnackbar}
        />
    </Dialog>
  );
}