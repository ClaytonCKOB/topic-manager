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
    const [topicVotes, setTopicVotes] = useState([])
    const topicService = new TopicService();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        topicService.saveVote(1, 1, 1);
    }, []);

    const redirectHome = () => {
        navigate("/home");
    };

    const getTopics = async (meetingId) => {
        let data = await topicService.getTopicsByMeetingId(meetingId);
        console.log(data);
        setTopics(data || []);
    }

    const getTopicVote = async (meetingId) => {
        let data = await topicService.getVotesByMeetingId(meetingId);
        setTopics(data || []);
    }

    useEffect(() => {
        getTopics(id);
        getTopicVote(id);
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
                        votes={topics.length}
                        text={"Votantes Totais"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={topicVotes.length}
                        text={"Votos Registrados"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={topics.length - topicVotes.length}
                        text={"Votos Faltantes"}
                    />
                </Grid>
                <Grid container spacing={3} sx={{display: "flex", flexDirection: "column"}}>
                    {topics.map((topic, index) => (
                        <TopicVote topic={topic} index={index}/>
                    ))}
                </Grid>
            </Box>
        </Box> 
    </>
}