import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";


export default function UserList() {
    const [users, setUsers] = useState([]);
    const [isRequesting, setIsRequesting] = useState(false);
    const userService = new UserService();
    const navigate = useNavigate();

    const redirectMeetingList = () => navigate("/meeting/list");

    const getUsers = async () => {
        let data = await userService.list();
        setUsers(data || []);
    }

    useEffect(() => {
        setIsRequesting(true);
        getUsers();
        setIsRequesting(false);
    }, []); 

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 0.25 },
        { field: 'username', headerName: 'Username', flex: 0.25 },
        { field: 'email', headerName: 'E-mail', flex: 0.25 },
        { field: 'role', headerName: 'Função', flex: 0.25 },
        { field: 'active', headerName: 'Ativo', flex: 0.25,
            renderCell: (params) => {
                return <>{params.value ? "Sim" : "Não"}</>;
            }
        },
        { 
            field: 'actions', 
            headerName: 'Ações', 
            flex: 0.35,
            renderCell: (params) => {
                return <>
                <IconButton 
                    color="primary" 
                    size="small"
                    onClick={() => redirectMeetingDetail(params.row.id)}
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
                onClick={redirectMeetingList}
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
            //   onClick={redirectCreateMeeting}
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
    </Box>
    );
}