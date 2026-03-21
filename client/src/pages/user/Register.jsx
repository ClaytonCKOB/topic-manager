import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Backdrop, Box, Button, CircularProgress, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye, faEyeSlash, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../base/components/message/ErrorMessage";
import UserInviteService from "../../services/UserInviteService";

export default function Register() {
    const isSmallScreen = useMediaQuery('(max-width:600px) or (max-height:600px)');

    const { id } = useParams();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const [serverOffline, setServerOffline] = useState(false);

    const navigate = useNavigate();
    const authService = new AuthService();
    const userInviteService = new UserInviteService();

    const getUserInvitation = async (id) => {
        try {
            let data = await userInviteService.getInvitation(id);
            setEmail(data.email);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Erro ao buscar convite.",
                severity: "error",
            });
        }
    }

    useEffect(() => {
        getUserInvitation(id);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setPasswordMismatch(false);

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register(id, name, username, email, password);
            if (response.status === 201 || response.status === 200) {
                setSnackbar({
                    open: true,
                    message: "Conta criada com sucesso! Faça login.",
                    severity: "success",
                });
                authService.logout();
                navigate("/login");
            } else {
                setSnackbar({
                    open: true,
                    message: "Erro ao registrar. Verifique os dados.",
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Register failed:", error);
            setSnackbar({
                open: true,
                message: "Erro ao conectar ao servidor.",
                severity: "error",
            });
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
            }}
        >
            <Backdrop open={serverOffline} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "40px",
                        border: "1px solid",
                        borderColor: "error.main",
                        gap: "30px",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    <IconButton onClick={() => setServerOffline(false)} sx={{ position: "absolute", top: 10, right: 10 }}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                    <Typography variant="h5" sx={{ color: "error.main", fontWeight: "bold" }}>
                        Servidor offline
                    </Typography>
                    <Typography variant="h2" sx={{ color: "error.main" }}>
                        <FontAwesomeIcon icon={faLinkSlash} />
                    </Typography>
                </Box>
            </Backdrop>

            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "1px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    maxWidth: 450,
                    width: "100%",
                    p: isSmallScreen ? "2rem" : "3rem",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                        Criar Conta
                    </Typography>

                    <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
                    <TextField label="Email" type="email" value={email} disabled onChange={(e) => setEmail(e.target.value)} fullWidth />

                    <TextField
                        label="Senha"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </IconButton>
                                )
                            }
                        }}
                    />

                    <TextField
                        label="Confirmar senha"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={passwordMismatch}
                        helperText={passwordMismatch ? "As senhas não coincidem" : ""}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                    </IconButton>
                                )
                            }
                        }}
                    />

                    <Button variant="contained" sx={{ height: 56, mt: 1 }} onClick={handleRegister}>
                        {loading ? <CircularProgress color="inherit" size={24} /> : "Registrar"}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 1, textAlign: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
                        Já possui conta? Faça login
                    </Typography>
                </Box>
            </Box>

            <ErrorMessage snackbar={snackbar} setSnackbar={setSnackbar} />
        </Box>
    );
};