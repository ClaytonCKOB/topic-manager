import { useEffect, useState } from "react"
import MeetingService from "../../services/MeetingService";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Typography, Button, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

export default function MeetingList() {
    const [meetingList, setMeetingList] = useState([]);
    const [isRequesting, setIsRequesting] = useState(false);

    const meetingService = new MeetingService();
    const navigate = useNavigate();
    
    const getMeetingList = async (attr = {}) => {
        const data = await meetingService.list(attr);
        setMeetingList(data || []); 
    };

    useEffect(() => {    
        setIsRequesting(true);
        getMeetingList();
        setIsRequesting(false);
    }, []);

    const redirectCreateMeeting = () => {
        navigate("/meeting/create");
    }

    const redirectMeetingDetail = (meeting_id) => {
        navigate("/meeting/detail/" + meeting_id);
    }

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
                    <IconButton color="primary" size="small">
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                    </>;
            }
        }
    ];

    return (
    <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
        <Box mb={3}>
            <Typography variant="h5" fontWeight="bold">
                Próximas Reuniões para Votação
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Veja as reuniões agendadas e registre seu voto nas pautas.
            </Typography>

            {
                meetingList.map((meeting, index) => (
                    <>
                        <Box sx={{border: '2px dotted gray', backgroundColor: 'white', display: "flex", justifyContent: "space-between", padding: 2, alignItems: 'center', borderRadius: 2}}>
                            <Box>
                                <Typography>
                                    {meeting.title}
                                </Typography>
                                <Typography>
                                    {formatDate(meeting.startDate)} - {formatDate(meeting.endDate)}
                                </Typography>
                                <Typography>
                                    {meeting.topics.length} Item(ns) de pauta
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    onClick={() => {redirectMeetingDetail(meeting.id)}}
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                                >
                                Ver pautas / Votar
                                </Button>
                            </Box>
                        </Box>
                    </>
                ))
            }

        </Box>
        <Box>
            <Typography variant="h5" fontWeight="bold">
                Gerenciamento de Reuniões
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Crie e gerencie as reuniões e suas pautas.
            </Typography>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={redirectCreateMeeting}
                sx={{ borderRadius: 2 }}
                >
                Nova Reunião
                </Button>
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
        </Box>
    </Box>
  );
}