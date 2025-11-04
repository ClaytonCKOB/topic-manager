import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import DeleteDialog from "../../base/components/dialog/DeleteDialog";
import ErrorMessage from "../../base/components/message/ErrorMessage";


export default function UserList() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const userService = new UserService();
    const navigate = useNavigate();

    const redirectHome = () => navigate("/home");

    const getUsers = async () => {
        let data = await userService.list();
        setUsers(data || []);
    }

    useEffect(() => {
        setIsRequesting(true);
        getUsers();
        setIsRequesting(false);
    }, []); 

    const handleDeleteClick = (userId) => {
        setUserId(userId);
        setOpenDeleteModal(true);
    };
    
    const handleCancelDelete = () => {
        setOpenDeleteModal(false);
        setUserId(null);
    };

    const handleConfirmDelete = async () => {
        if (!userId) return;
        try {
            await userService.delete(userId);
            // await getMeetingList();

        } catch (err) {
            console.error("Erro ao deletar usuário:", err);
            setSnackbar({
                open: true,
                message: "Erro ao deletar usuário.",
                severity: "error",
            });
        } finally {
            setOpenDeleteModal(false);
            setUserId(null);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 0.25 },
        { field: 'username', headerName: 'Username', flex: 0.25 },
        { field: 'email', headerName: 'E-mail', flex: 0.25 },
        { field: 'role', headerName: 'Função', flex: 0.25 },
        { 
            field: 'actions', 
            headerName: 'Ações', 
            flex: 0.35,
            renderCell: (params) => {
                return <>
                <IconButton 
                    color="primary" 
                    size="small"
                    onClick={() => {setUserId(params.row.id); setOpenUserModal(true);}}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    color="error" 
                    size="small"
                    onClick={() => handleDeleteClick(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
                </>;
            }
            }
    ];

    return (
    <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
        <Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={redirectHome}
                sx={{ mb: 3 }}
            >
            Voltar
            </Button>
        </Box>
        <Box mb={4} mt={6} sx={{display: "flex", justifyContent: "space-between"}}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Gerenciamento de Usuários
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {setUserId(null); setOpenUserModal(true);}}
              sx={{
                borderRadius: 2,
                alignSelf: "flex-end",
                textTransform: "none",
                py: 1,              
                px: 2,                
              }}
            >
              Novo Usuário
            </Button>
          </Box>
        </Box>
        <Box>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={25}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                loading={isRequesting}
                initialState={{
                sorting: {
                    sortModel: [{ field: 'name', sort: 'asc' }],
                },
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                }
                }}
            />
        </Box>

        <UserModal
            openUserModal={openUserModal}
            setOpenUserModal={setOpenUserModal}
            userId={userId}
        />
        <DeleteDialog 
            openDeleteModal={openDeleteModal}
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
        />
        <ErrorMessage
            snackbar={snackbar}
            setSnackbar={setSnackbar}
        />
    </Box>
    );
}