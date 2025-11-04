import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Backdrop, Box, Button, CircularProgress, IconButton, Skeleton, TextField, Typography, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faClose, faEye, faEyeSlash, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../base/components/message/ErrorMessage";

const Login = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px) or (max-height:600px)');
    const loginWidthPercentage = isSmallScreen ? 100 : 40;
    
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
                    message: "Credenciais incorretas.",
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
                backgroundColor: "gray",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                padding: 0,
                margin: 0,
                overflow: "hidden",
            }}
        >
            <Backdrop 
                open={serverOffline} 
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                onClick={() => setServerOffline(false)}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white", 
                        padding: "40px", 
                        border: "1px solid",
                        borderColor: "error.main",
                        gap: "30px"
                    }}
                >
                    <IconButton 
                        onClick={() => setServerOffline(false)} 
                        sx={{ position: "absolute", top: "10px", right: "10px", width: "40px", height: "40px" }}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" sx={{ color: "error.main", fontWeight: "bold" }}>
                            Servidor offline
                        </Typography>
                        <Typography variant="body1" sx={{ color: "error.main", lineHeight: "1.5", marginTop: "10px" }}>
                            O servidor não está respondendo. Por favor, tente novamente mais tarde.
                        </Typography>
                    </Box>
                    <Typography variant="h2" sx={{ color: "error.main" }}>
                        <FontAwesomeIcon icon={faLinkSlash} />
                    </Typography>
                </Box>
            </Backdrop>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    backgroundColor: "white",
                    top: 0,
                    left: 0,
                    width: `${loginWidthPercentage}%`,
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        maxWidth: "400px",
                        width: "100%",
                        gap: "15px",
                        padding: "2rem",
                    }}
                >
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
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setWrongCredentials(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                        sx={{ width: "100%" }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{padding: '10px', height: '40px', width: '40px'}}
                                    >
                                        <FontAwesomeIcon
                                            size="xs"
                                            icon={showPassword ? faEye : faEyeSlash}
                                            color={wrongCredentials ? 'darkred' : 'gray'}
                                        />
                                    </IconButton>
                                ),
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off'
                                }
                            }
                        }}
                        helperText={wrongCredentials ? "Usuário ou senha inválidos" : ""}
                    />
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
                        {loading ? (
                            <CircularProgress color="inherit" size={24} />
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: isSmallScreen ? "none" : "block",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: `${100 - loginWidthPercentage}%`,
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
            </Box>
            <ErrorMessage
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
        </Box>
    )
};

export default Login;
