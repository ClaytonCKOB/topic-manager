import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Box, Button, CircularProgress, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../base/components/message/ErrorMessage";

const Login = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px) or (max-height:600px)');
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const [serverOffline, setServerOffline] = useState(false);

    const navigate = useNavigate();
    const authService = new AuthService();

    useEffect(() => {
        const token = authService.getToken();
        if (authService.isTokenValid(token)) {
            navigate("/home");
        }
    }, []);

    useEffect(() => {
        document.title = "Fazer login no Topic Manager";
    }, []);

    const handleLogin = async (e) => {
        setLoading(true);
        setWrongCredentials(false);
        e.preventDefault();
        try {
            const response = await authService.login(username, password);

            if (response.status == 200) {
                navigate("/home");
            } else if (response.status == 401) {
                setWrongCredentials(true);
                setSnackbar({
                    open: true,
                    message: "Credenciais incorretas.",
                    severity: "error",
                });
            } else {
                setSnackbar({
                    open: true,
                    message: "Erro ao realizar login.",
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
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
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "1px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    maxWidth: 380,
                    width: "100%",
                    p: isSmallScreen ? "3rem" : "5rem",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 4,
                        }}
                    >
                        Topic Manager
                    </Typography>

                    <TextField
                        autoFocus
                        autoComplete="username"
                        error={wrongCredentials}
                        label="Usuário"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setWrongCredentials(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                        fullWidth
                    />

                    <TextField
                        error={wrongCredentials}
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setWrongCredentials(false)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </IconButton>
                                ),
                                autoComplete: "new-password",
                                form: { autoComplete: "off" },
                            },
                        }}
                        helperText={wrongCredentials ? "Usuário ou senha inválidos" : ""}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleLogin}
                        sx={{
                            height: 56,
                            mt: 3,
                        }}
                    >
                        {loading ? <CircularProgress color="inherit" size={24} /> : "Entrar"}
                    </Button>
                </Box>
            </Box>
            <ErrorMessage snackbar={snackbar} setSnackbar={setSnackbar} />
        </Box>
    );
};

export default Login;
