import { Box, Button, Dialog, DialogActions, DialogContent, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
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
            const emailList = email.split(',').map(e => e.trim()).filter(e => e.length > 0);

            if (emailList.length === 0) {
                setSnackbar({
                    open: true,
                    message: "Preencha o email para envio do convite.",
                    severity: "error",
                });
            } else {
                setLoading(true);
                await userInviteService.sendInvitation(role, emailList);
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
            setLoading(false);
        }
    };

    const handleCancelUserChange = () => setOpenUserModal(false);

    return (
        <Dialog open={openUserModal} onClose={handleCancelUserChange} fullWidth maxWidth="sm">
            <Box
                sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    px: 3,
                    py: 2,
                    color: "white",
                    borderRadius: "4px 4px 0 0"
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Enviar Convite
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Convide novos usuários para o sistema
                </Typography>
            </Box>
            <DialogContent>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 1
                    }}
                >
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Função
                        </Typography>
                        <Select
                            fullWidth
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1
                                }
                            }}
                        >
                            <MenuItem value={1}>Participante</MenuItem>
                            <MenuItem value={2}>Chefe</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            E-mail (separados por vírgula)
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="email1@exemplo.com, email2@exemplo.com"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1
                                }
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, gap: 1, boxShadow: "0 -2px 8px rgba(0,0,0,0.08)" }}>
                <Button
                    onClick={handleCancelUserChange}
                    color="inherit"
                    sx={{
                        borderRadius: 1,
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSaveChanges}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1,
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                            transform: "translateY(-2px)"
                        },
                        "&:disabled": {
                            boxShadow: "none"
                        }
                    }}
                >
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