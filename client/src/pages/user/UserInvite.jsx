import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserInviteService from "../../services/UserInviteService";
import ErrorMessage from "../../base/components/message/ErrorMessage";

export default function UserInvite({ openUserModal, setOpenUserModal }) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(1);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const userInviteService = new UserInviteService();

    const handleSaveChanges = async () => {
        try {
            if (email == null || email.length == 0) {
                setSnackbar({
                    open: true,
                    message: "Preencha o email para envio do convite.",
                    severity: "error",
                });

            } else {
                setLoading(true);
                await userInviteService.sendInvitation(role, email);
    
                setOpenUserModal(false);
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: "Erro ao enviar convite.",
                severity: "error",
            });
        }
    };

    const handleCancelUserChange = () => setOpenUserModal(false);

    return (
    <Dialog open={openUserModal} onClose={handleCancelUserChange} fullWidth maxWidth="sm">
        <DialogTitle>Enviar Convite</DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <Box mb={3}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Função
                    </Typography>
                    <Select
                        value={role}
                        onChange={(e) => {setRole(e.target.value)}}
                    >
                        <MenuItem value={1}>Participante</MenuItem>
                        <MenuItem value={2}>Chefe</MenuItem>
                    </Select>
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    E-mail
                    </Typography>
                    <Input
                    fullWidth
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
            </Box>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleCancelUserChange} color="inherit">
            Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary" variant="contained" disabled={loading}>
            Enviar
            </Button>
        </DialogActions>
        <ErrorMessage
            snackbar={snackbar}
            setSnackbar={setSnackbar}
        />
    </Dialog>
  );
}