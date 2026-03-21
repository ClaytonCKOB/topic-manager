import { Typography, Button, Dialog, DialogContent, DialogActions, Box } from "@mui/material";

export default function DeleteDialog({openDeleteModal, handleCancelDelete, handleConfirmDelete}) {

    return <Dialog
            open={openDeleteModal}
            onClose={handleCancelDelete}
            fullWidth
            maxWidth="sm"
        >
            <DialogContent>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        p: 3,
                        mt: 1,
                    }}
                >
                    <Typography variant="body1" fontSize={18}>
                        Tem certeza que deseja remover este item?
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, gap: 1, boxShadow: "0 -2px 8px rgba(0,0,0,0.08)" }}>
                <Button
                    onClick={handleCancelDelete}
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
                    onClick={handleConfirmDelete}
                    color="error"
                    variant="contained"
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
                        }
                    }}
                >
                    Remover
                </Button>
            </DialogActions>
        </Dialog>;
}