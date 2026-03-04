import { Box, Typography, Button, TextField, IconButton, Chip } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService";
import AuthService from "../../services/AuthService";
import FileList from "../../base/components/files/FileList";
import ErrorMessage from "../../base/components/message/ErrorMessage";

export default function TopicVote({ topic, index, refreshTopics }) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedVote, setSelectedVote] = useState(null);
    const [comment, setComment] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const topicService = new TopicService();
    const authService = new AuthService();

    const votes = [
        { label: "Aprovo", value: 0, color: "success" },
        { label: "Reprovo", value: 1, color: "error" },
        { label: "Me abstenho", value: 2, color: "secondary" },
        { label: "Colocar em diligência", value: 3, color: "warning" },
    ];

    const saveVote = async (topicId, comment, status) => {
        try {
            setIsSaving(true);
            await topicService.saveVote(authService.getUserId(), topicId, comment, status);
            refreshTopics();
            setTimeout(() => setIsSaving(false), 800);

        } catch (err) {
            console.error("Erro ao salvar voto:", err);
            setSnackbar({
                open: true,
                message: "Erro ao salvar voto.",
                severity: "error",
            });
            setIsSaving(false);
        }
    }

    useEffect(() => {
        let currentVote = topic.votes.filter(vote => vote.user.id == authService.getUserId()).length > 0 ? topic.votes.filter(vote => vote.user.id == authService.getUserId())[0].status : null;
        let currentComment = topic.votes.filter(vote => vote.user.id == authService.getUserId()).length > 0 ? topic.votes.filter(vote => vote.user.id == authService.getUserId())[0].comment : "";
        setSelectedVote(currentVote);
        setComment(currentComment);
    }, []);

    const hasVoted = selectedVote !== null;
    const voteLabel = hasVoted ? votes.find(v => v.value === selectedVote)?.label : "Pendente";

    const getChipColor = () => {
        if (selectedVote === null) return 'warning';
        return votes.find(v => v.value === selectedVote)?.color || 'warning';
    };

    return (
        <Box
        key={topic.id || index}
        sx={{
            backgroundColor: "white",
            borderRadius: 3,
            borderLeft: `6px solid #e0e0e0`,
            p: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
            }
        }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {index + 1}. {topic.title}
                    </Typography>
                    {collapsed && (
                        <Chip
                            icon={hasVoted ? <CheckCircleIcon /> : <PendingIcon />}
                            label={voteLabel}
                            color={getChipColor()}
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    )}
                </Box>

                <IconButton
                    onClick={() => setCollapsed((prev) => !prev)}
                    sx={{
                        transition: "transform 0.3s ease",
                        transform: collapsed ? "rotate(0deg)" : "rotate(180deg)"
                    }}
                >
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>

            {!collapsed && (
                <>
                <FileList
                    files={topic.files}
                    isEditable={false}
                    removeFile={(fIndex) => {}}
                />

                <Box mb={3} mt={2}>
                    <Typography variant="subtitle1" fontWeight="600" mb={2}>
                        Seu Voto:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {votes.map(({ label, value, color }) => (
                        <Button
                        key={value}
                        variant={selectedVote === value ? "contained" : "outlined"}
                        color={color}
                        onClick={() => setSelectedVote(value)}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            transition: "all 0.2s ease",
                            ...(selectedVote === value && {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                transform: "scale(1.05)"
                            })
                        }}
                        >
                        {label}
                        </Button>
                    ))}
                    </Box>
                </Box>

                {
                    selectedVote == 3 ?
                    <Box mb={3}>
                        <Typography variant="subtitle1" fontWeight="600" mb={1}>
                            Comentário / Justificativa
                        </Typography>
                        <TextField
                        placeholder="Adicione um comentário (opcional)..."
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => {setComment(e.target.value)}}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                            }
                        }}
                        />
                    </Box>
                    : null
                }

                <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
                    <Button
                        variant="contained"
                        loading={isSaving}
                        color="primary"
                        disabled={isSaving}
                        sx={{
                            borderRadius: 3,
                            px: 5,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            "&:hover": {
                                boxShadow: "0 6px 20px rgba(0,0,0,0.25)"
                            }
                        }}
                        onClick={() => {saveVote(topic.id, comment, selectedVote)}}
                    >
                        {isSaving ? "Salvando..." : "Salvar Voto"}
                    </Button>
                </Box>
                </>
            )}
            <ErrorMessage
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
        </Box>
    );
}
