import { Box, Grid, Typography, Button, IconButton, TextField} from "@mui/material"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import TotalVotes from "../../base/components/TotalVotes";
import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService";
import { useNavigate, useParams } from "react-router-dom";

export default function MeetingCreate() {
    const [topics, setTopics] = useState([]);
    const topicService = new TopicService();
    const { id } = useParams();
    const navigate = useNavigate();

  const redirectMeetingList = () => {
    navigate("/meeting/list");
  };

    const getTopics = async (meetingId) => {
        let data = await topicService.getTopicsByMeetingId(meetingId);
        setTopics(data || []);
    }

    useEffect(() => {
        getTopics(id);
    }, []);

    return <>
        <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
            <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={redirectMeetingList}
            sx={{ mb: 3 }}
            >
            Voltar
            </Button>
            <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
                    Progresso da Reunião
                </Typography>
                <Grid sx={{display: "flex"}}>
                    <TotalVotes
                        icon={GroupIcon}
                        votes={2}
                        text={"Votantes Totais"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={2}
                        text={"Votos Registrados"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={2}
                        text={"Votos Faltantes"}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {topics.map((topic, index) => (
                        <Box
                        key={topic.id || index}
                        sx={{
                            backgroundColor: "#f9fafb",
                            borderRadius: 2,
                            p: 3,
                            mb: 4,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                        }}
                        >
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            {index + 1}. {topic.description}
                        </Typography>

                        <Box mb={3}>
                            <Typography variant="subtitle1" mb={1}>
                            Seu Voto:
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Button
                                variant="outlined"
                                color="success"
                                sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                            >
                                Aprovo
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                            >
                                Reprovo
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                            >
                                Me abstenho
                            </Button>
                            <Button
                                variant="outlined"
                                color="warning"
                                sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                            >
                                Colocar em diligência
                            </Button>
                            </Box>
                        </Box>
                        <Box mb={3}>
                            <Typography variant="subtitle1" mb={1}>
                            Comentário / Justificativa
                            </Typography>
                            <TextField
                            placeholder="Adicione um comentário (opcional)..."
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                            >
                            Salvar Voto
                            </Button>
                        </Box>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box> 
    </>
}