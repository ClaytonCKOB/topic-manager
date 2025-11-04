import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

    return (
        <Box
        key={topic.id || index}
        sx={{
            backgroundColor: "#f9fafb",
            borderRadius: 2,
            p: 3,
            mb: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            position: "relative",
            width: 0.6
        }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                {index + 1}. {topic.title}
                </Typography>

                <IconButton onClick={() => setCollapsed((prev) => !prev)}>
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
                    <Typography variant="subtitle1" mb={1}>
                    Seu Voto:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {votes.map(({ label, value, color }) => (
                        <Button
                        key={value}
                        variant={selectedVote === value ? "contained" : "outlined"}
                        color={color}
                        onClick={() => setSelectedVote(value)}
                        sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                        >
                        {label}
                        </Button>
                    ))}
                    </Box>
                </Box>

                {
                    selectedVote == 3 ?
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
                        value={comment}
                        onChange={(e) => {setComment(e.target.value)}}
                        />
                    </Box>
                    : null
                }

                <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
                    <Button variant="contained" loading={isSaving} color="primary" sx={{ borderRadius: 2, px: 4, py: 1.2 }} onClick={() => {saveVote(topic.id, comment, selectedVote)}}>
                    Salvar Voto
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
