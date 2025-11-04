import { 
  Box, Typography, Button
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import formatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

export default function MeetingVoteList({meetingList}) {
    const navigate = useNavigate();

    const redirectMeetingVote = (meeting_id) => {
        navigate("/meeting/vote/" + meeting_id);
    };

    return <>
    <Box mb={8}>
        <Typography variant="h5" fontWeight="bold">
          Próximas Reuniões para Votação
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Veja as reuniões agendadas e registre seu voto nas pautas.
        </Typography>

        {meetingList
          .filter((m) => m.endDate && new Date(m.endDate) > new Date())
          .map((meeting, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#e3e9f0",
              borderRadius: 2,
              px: 3,
              py: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.2s",
            }}
            mb={2}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {meeting.title}
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(meeting.startDate)}  - {formatDate(meeting.endDate)}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {meeting.topics.length} item(ns) de pauta.
              </Typography>
            </Box>
            <Button
              onClick={() => redirectMeetingVote(meeting.id)}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 500
              }}
            >
              Ver Pautas / Votar
            </Button>
          </Box>
        ))}
    </Box>
    </>;
}