import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Box, Button, CircularProgress, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../base/components/message/ErrorMessage";

const Login = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px) or (max-height:600px)');
    const loginWidthPercentage = 100; //isSmallScreen ? 100 : 40;
    
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
                margin: 0
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${loginWidthPercentage}%`,
                    backgroundColor: "#f5f5f5",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxSizing: "border-box",
                        maxWidth: "500px",
                        height: "60%",
                        gap: "15px",
                        padding: "3rem",
                        alignItems: "center",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "white",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "20px",
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
                            sx={{ width: "100%", marginTop: "20px" }}
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
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleLogin}
                        sx={{ 
                            width: "100%",
                            height: "56px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "white",
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
