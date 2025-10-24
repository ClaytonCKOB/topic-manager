import { useState } from "react"
import MeetingService from "../../services/MeetingService";
import { DataGrid } from "@mui/x-data-grid";
import { 
  Box, Typography, Button, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../base/components/dialog/DeleteDialog";

export default function MeetingManagement({meetingList, isRequesting}) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const navigate = useNavigate();
    const meetingService = new MeetingService();

    const redirectCreateMeeting = () => {
        navigate("/meeting/create");
    };

    const redirectMeetingDetail = (meeting_id) => {
        navigate("/meeting/detail/" + meeting_id);
    };

    const handleDeleteClick = (meetingId) => {
        setSelectedMeetingId(meetingId);
        setOpenDeleteModal(true);
      };
    
    const handleCancelDelete = () => {
        setOpenDeleteModal(false);
        setSelectedMeetingId(null);
    };

    const handleConfirmDelete = async () => {
    if (!selectedMeetingId) return;
    try {
        await meetingService.delete(selectedMeetingId);
        // await getMeetingList();

    } catch (err) {
        console.error("Erro ao deletar reunião:", err);

    } finally {
        setOpenDeleteModal(false);
        setSelectedMeetingId(null);
    }
    };

    const columns = [
        { field: 'title', headerName: 'Título', flex: 0.25 },
        { 
        field: 'startDate', 
        headerName: 'Início', 
        flex: 0.3,
        renderCell: (params) => {
            const formatted = params.value ? formatDate(params.value) : '';
            return <div>{formatted}</div>;
        }
        },
        { 
        field: 'endDate', 
        headerName: 'Fim', 
        flex: 0.2, 
        align: 'center',
        renderCell: (params) => {
            const formatted = params.value ? formatDate(params.value) : '';
            return <div>{formatted}</div>;
        }
        },
        { field: 'creator', headerName: 'Criador', flex: 0.35},
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

    return <>
    <Box>
        <Box mb={4} sx={{display: "flex", justifyContent: "space-between"}}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Gerenciamento de Reuniões
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Crie e gerencie as reuniões e suas pautas.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={redirectCreateMeeting}
              sx={{
                borderRadius: 2,
                alignSelf: "flex-end",
                textTransform: "none",
                py: 1,              
                px: 2,                
              }}
            >
              Nova Reunião
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={meetingList}
          columns={columns}
          pageSize={25}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          loading={isRequesting}
          initialState={{
            sorting: {
              sortModel: [{ field: 'startDate', sort: 'desc' }],
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            }
          }}
        />

        <DeleteDialog 
          openDeleteModal={openDeleteModal}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
    </Box>
    </>;
}