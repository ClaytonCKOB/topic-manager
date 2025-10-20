import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

export default function UserModal({ openUserModal, setOpenUserModal, userId }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (openUserModal && userId) getUser();
  }, [openUserModal, userId]);

  const handleSaveChanges = async () => {
    try {
        await userService.update(user);
        setOpenUserModal(false);
    } catch (err) {
        console.error(err);
    }
  };

  const handleCancelUserChange = () => setOpenUserModal(false);

  return (
    <Dialog open={openUserModal} onClose={handleCancelUserChange} fullWidth maxWidth="sm">
        <DialogTitle>Gerenciar Perfil</DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Username
                </Typography>
                <Input fullWidth disabled value={user.username || ""} />
            </Box>

            <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Função
                </Typography>
                <Input fullWidth disabled value={user.role || ""} />
            </Box>

            <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Nome
                </Typography>
                <Input
                fullWidth
                value={user.name || ""}
                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                />
            </Box>

            <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                E-mail
                </Typography>
                <Input
                fullWidth
                value={user.email || ""}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                />
            </Box>
            </Box>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleCancelUserChange} color="inherit">
            Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary" variant="contained" disabled={loading}>
            Salvar
            </Button>
        </DialogActions>
    </Dialog>
  );
}