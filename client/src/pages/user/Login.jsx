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
                width: "100vw",
                height: "100vh",
                padding: 0,
                margin: 0,
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: isSmallScreen ? 2 : 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        width: "100%",
                        maxWidth: isSmallScreen ? "100%" : "400px",
                        minHeight: isSmallScreen ? "auto" : "400px",
                        gap: "32px",
                        padding: isSmallScreen ? "2rem" : "3rem",
                        alignItems: "center",
                        borderRadius: "8px",
                        boxShadow: isSmallScreen ? "none" : "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: isSmallScreen ? "transparent" : "white",
                    }}
                >
                    <Typography
                        variant={isSmallScreen ? "h5" : "h4"}
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: isSmallScreen ? "24px" : "60px",
                        }}
                    >
                        Topic Manager
                    </Typography>

                    <Box>
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
                            sx={{ width: "100%" }}
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
                            sx={{ width: "100%", marginTop: "24px" }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ padding: "10px", height: "40px", width: "40px" }}
                                        >
                                            <FontAwesomeIcon
                                                size="xs"
                                                icon={showPassword ? faEye : faEyeSlash}
                                                color={wrongCredentials ? "darkred" : "gray"}
                                            />
                                        </IconButton>
                                    ),
                                    autoComplete: "new-password",
                                    form: { autoComplete: "off" },
                                },
                            }}
                            helperText={wrongCredentials ? "Usuário ou senha inválidos" : ""}
                            fullWidth={isSmallScreen}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleLogin}
                        sx={{ 
                            width: isSmallScreen ? "100%" : "100%",
                            minWidth: isSmallScreen ? "auto" : "200px",
                            height: "56px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "white",
                            marginTop: "30px",
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
