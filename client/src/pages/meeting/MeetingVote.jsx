import { Box, Grid, Typography, Button} from "@mui/material"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import TotalVotes from "../../base/components/TotalVotes";
import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService";
import { useNavigate, useParams } from "react-router-dom";
import TopicVote from "../topic/TopicVote";

export default function MeetingVote() {
    const [topics, setTopics] = useState([]);
    const [totalVotes, setTotalVotes] = useState({})
    const topicService = new TopicService();
    const { id } = useParams();
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/home");
    };

    const getTopics = async (meetingId) => {
        let data = await topicService.getTopicsByMeetingId(meetingId);
        let votes = await topicService.getTotalVotes(id);

        setTopics(data || []);
        setTotalVotes(votes || {});
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
            onClick={redirectHome}
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
                        votes={totalVotes.total}
                        text={"Votantes Totais"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={totalVotes.voted}
                        text={"Votos Registrados"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={totalVotes.missing}
                        text={"Votos Faltantes"}
                    />
                </Grid>
                <Grid container spacing={3} sx={{display: "flex", flexDirection: "column"}}>
                    {topics.map((topic, index) => (
                        <TopicVote topic={topic} index={index} refreshTopics={() => getTopics(id)}/>
                    ))}
                </Grid>
            </Box>
        </Box> 
    </>
}