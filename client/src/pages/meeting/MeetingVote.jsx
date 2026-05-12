import { Box, Typography, Button, LinearProgress, Chip, CircularProgress} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TotalVotes from "../../base/components/TotalVotes";
import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService";
import MeetingService from "../../services/MeetingService";
import { useNavigate, useParams } from "react-router-dom";
import TopicVote from "../topic/TopicVote";
import AuthService from "../../services/AuthService";

export default function MeetingVote() {
    const [topics, setTopics] = useState([]);
    const [flatTopics, setFlatTopics] = useState([]);
    const [totalVotes, setTotalVotes] = useState({
        totalParticipants: 0,
        totalTopics: 0,
        totalExpectedVotes: 0,
        totalVotesCast: 0,
        totalVotesPending: 0
    });
    const [filterStatus, setFilterStatus] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const topicService = new TopicService();
    const meetingService = new MeetingService();
    const authService = new AuthService();
    const { id } = useParams();
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/home");
    };

    const getTopics = async (meetingId) => {
        try {
            const [data, stats] = await Promise.all([
                topicService.getTopicsByMeetingId(meetingId),
                meetingService.getVotingStats(meetingId)
            ]);

            setTopics(data || []);
            setFlatTopics(topicService.flattenTopics(data || [], true));
            setTotalVotes(stats || {});
        } catch (error) {
            console.error("Error loading meeting data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTopics(id);
    }, []);

    const voteProgress = totalVotes.totalExpectedVotes > 0
        ? (totalVotes.totalVotesCast / totalVotes.totalExpectedVotes) * 100
        : 0;

    const getUserVoteStatus = (topic) => {
        const userVote = topic.votes.filter(vote => vote.user.id == authService.getUserId());
        if (userVote.length === 0) return null;
        return userVote[0].status;
    };

    const filteredTopics = flatTopics.filter(topic => {
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
                    Registre seus votos nas itens abaixo
                </Typography>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress size={60} />
                </Box>
            ) : (
                <Box px={4} py={4}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
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
                        {totalVotes.totalVotesCast} de {totalVotes.totalExpectedVotes} votos registrados
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
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
                        votes={totalVotes.totalParticipants}
                        text="Votantes Totais"
                        color="primary"
                    />
                    <Box sx={{ width: "1px", height: "60px", bgcolor: "divider" }} />
                    <TotalVotes
                        icon={CheckCircleIcon}
                        votes={totalVotes.totalVotesCast}
                        text="Votos Registrados"
                        subtext={`de ${totalVotes.totalExpectedVotes} esperados`}
                        color="success"
                    />
                    <Box sx={{ width: "1px", height: "60px", bgcolor: "divider" }} />
                    <TotalVotes
                        icon={PendingIcon}
                        votes={totalVotes.totalVotesPending}
                        text="Votos Faltantes"
                        color="warning"
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Itens para Votação
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {filteredTopics.length} de {topics.length} itens
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
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
                        <TopicVote
                            key={topic.id}
                            topic={topic}
                            sequence={topic.sequence}
                            isParent={topic.isParent}
                            refreshTopics={() => getTopics(id)}
                        />
                    ))}
                </Box>
            </Box>
            )}
        </Box>
    </>
}