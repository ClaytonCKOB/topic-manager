import { Box, Typography, Button, LinearProgress, Chip} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import TotalVotes from "../../base/components/TotalVotes";
import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService";
import { useNavigate, useParams } from "react-router-dom";
import TopicVote from "../topic/TopicVote";
import AuthService from "../../services/AuthService";

export default function MeetingVote() {
    const [topics, setTopics] = useState([]);
    const [totalVotes, setTotalVotes] = useState({})
    const [filterStatus, setFilterStatus] = useState('all');
    const topicService = new TopicService();
    const authService = new AuthService();
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

    const voteProgress = totalVotes.total > 0 ? (totalVotes.voted / totalVotes.total) * 100 : 0;

    const getUserVoteStatus = (topic) => {
        const userVote = topic.votes.filter(vote => vote.user.id == authService.getUserId());
        if (userVote.length === 0) return null;
        return userVote[0].status;
    };

    const filteredTopics = topics.filter(topic => {
        if (filterStatus === 'all') return true;
        const voteStatus = getUserVoteStatus(topic);
        if (filterStatus === 'pending') return voteStatus === null;
        return voteStatus === parseInt(filterStatus);
    });

    const filterOptions = [
        { label: "Todas", value: "all" },
        { label: "Pendentes", value: "pending" },
        { label: "Aprovadas", value: "0" },
        { label: "Reprovadas", value: "1" },
        { label: "Abstenções", value: "2" },
        { label: "Diligências", value: "3" },
    ];

    return <>
        <Box bgcolor="#f8fafc" minHeight="100vh">
            <Box
                sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    px: 4,
                    py: 3,
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={redirectHome}
                    sx={{
                        mb: 2,
                        bgcolor: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.3)"
                        }
                    }}
                >
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Progresso da Reunião
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Registre seus votos nas pautas abaixo
                </Typography>
            </Box>

            <Box px={4} py={4}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 3,
                        p: 3,
                        mb: 4,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="600">
                            Progresso Geral
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            {Math.round(voteProgress)}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={voteProgress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#e3f2fd",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                background: "linear-gradient(90deg, #1976d2 0%, #1565c0 100%)"
                            }
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {totalVotes.voted} de {totalVotes.total} votos registrados
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 3,
                        p: 3,
                        mb: 4,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        gap: 3
                    }}
                >
                    <TotalVotes
                        icon={GroupIcon}
                        votes={totalVotes.total}
                        text="Votantes Totais"
                        color="primary"
                    />
                    <Box sx={{ width: "1px", height: "60px", bgcolor: "divider" }} />
                    <TotalVotes
                        icon={HowToVoteIcon}
                        votes={totalVotes.voted}
                        text="Votos Registrados"
                        color="success"
                    />
                    <Box sx={{ width: "1px", height: "60px", bgcolor: "divider" }} />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={totalVotes.missing}
                        text="Votos Faltantes"
                        color="warning"
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Pautas para Votação
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {filteredTopics.length} de {topics.length} pautas
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 3,
                        p: 2,
                        mb: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        display: "flex",
                        gap: 1.5,
                        flexWrap: "wrap",
                        alignItems: "center"
                    }}
                >
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                        Filtrar:
                    </Typography>
                    {filterOptions.map(({ label, value }) => (
                        <Chip
                            key={value}
                            label={label}
                            onClick={() => setFilterStatus(value)}
                            color={filterStatus === value ? "primary" : "default"}
                            variant={filterStatus === value ? "filled" : "outlined"}
                            sx={{
                                fontWeight: filterStatus === value ? 600 : 400,
                                cursor: "pointer",
                                borderRadius: 1,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    transform: "scale(1.05)"
                                }
                            }}
                        />
                    ))}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {filteredTopics.map((topic, index) => (
                        <TopicVote key={index} topic={topic} index={topics.indexOf(topic)} refreshTopics={() => getTopics(id)}/>
                    ))}
                </Box>
            </Box>
        </Box>
    </>
}