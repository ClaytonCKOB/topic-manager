import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function DeleteDialog({openDeleteModal, handleCancelDelete, handleConfirmDelete}) {

    return <Dialog
            open={openDeleteModal}
            onClose={handleCancelDelete}
        >
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogContent>
            <Typography>
                Tem certeza que deseja remover?
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelDelete} color="inherit">
                Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
                Confirmar
            </Button>
            </DialogActions>
        </Dialog>;
}