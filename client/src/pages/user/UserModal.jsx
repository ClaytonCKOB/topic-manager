import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
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
                {isCreation ? "Criar Novo Usuário" : "Gerenciar Perfil"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {isCreation ? "Preencha os dados do novo usuário" : "Atualize as informações do perfil"}
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
                        Username
                    </Typography>
                    <TextField
                        fullWidth
                        disabled={!isCreation}
                        value={user.username || ""}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1
                            }
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Função
                    </Typography>
                    <TextField
                        fullWidth
                        disabled={!isCreation}
                        value={user.role || ""}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1
                            }
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Nome
                    </Typography>
                    <TextField
                        fullWidth
                        value={user.name || ""}
                        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1
                            }
                        }}
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