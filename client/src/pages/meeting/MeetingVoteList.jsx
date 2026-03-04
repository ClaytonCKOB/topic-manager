import {
  Box, Typography, Button, Chip
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopicIcon from "@mui/icons-material/Topic";
import formatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function MeetingVoteList({meetingList}) {
    const navigate = useNavigate();
    const authService = new AuthService();

    const redirectMeetingVote = (meeting_id) => {
        navigate("/meeting/vote/" + meeting_id);
    };

    return <>
    <Box mb={8}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Próximas Reuniões para Votação
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom mb={3}>
          Veja as reuniões agendadas e registre seu voto nas pautas.
        </Typography>

        {meetingList
          .filter((m) => m.endDate && new Date(m.endDate) > new Date())
          .map((meeting, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              px: 3,
              py: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
              }
            }}
            mb={2}
          >
            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                <Typography variant="h6" fontWeight="bold">
                  {meeting.title}
                </Typography>
                <Chip
                  label="Ativa"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(meeting.startDate)}  - {formatDate(meeting.endDate)}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <TopicIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {meeting.topics.length} item(ns) de pauta
                </Typography>
              </Box>
            </Box>
            {
              authService.isAdmin() ? null :
              <Button
                onClick={() => redirectMeetingVote(meeting.id)}
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)"
                  }
                }}
              >
                Ver Pautas / Votar
              </Button>
            }
          </Box>
        ))}
    </Box>
    </>;
}