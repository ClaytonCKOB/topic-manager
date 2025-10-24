import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button, TextField, Grid, Card, CardContent} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useEffect, useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import TopicSection from '../topic/TopicSection';
import AuthService from '../../services/AuthService';
import MeetingGeneralSection from './MeetingGeneralSection';

export default function MeetingCreate() {
  const { id } = useParams();
  const [isDetail, setIsDetail] = useState(false);
  const [isMeetingEditable, setIsMeetingEditable] = useState(true);
  const [meeting, setMeeting] = useState({
    title: "",
    description: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    topics: [{}],
  });

  const meetingService = new MeetingService();
  const authService = new AuthService();
  const navigate = useNavigate();
  const redirectHome = () => navigate("/home");

  const getMeeting = async (meetingId) => {
    const data = await meetingService.get(meetingId);
    if (data) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      setMeeting({
        id: data.id,
        title: data.title || "",
        description: data.description || "",
        startDate: start,
        startTime: start,
        endDate: end,
        endTime: end,
        topics: data.topics || [],
        votes: data.votes
      });

      const now = new Date();
      const meetingEnded = end < now;

      setIsMeetingEditable(authService.isAdmin() && !meetingEnded);
    }
  };

  useEffect(() => {
    if (id) {
      setIsDetail(true);
      getMeeting(id);
    }
  }, [id]);

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined.toISOString();
  };

  const saveMeeting = async () => {
    const start = combineDateTime(meeting.startDate, meeting.startTime);
    const end = combineDateTime(meeting.endDate, meeting.endTime);
    if (!isDetail) {
      await meetingService.create(meeting.title, start, end, meeting.topics);
    } else {
      await meetingService.update(meeting);
    }

    redirectHome();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
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

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isDetail ? "Detalhes da Reunião" : "Nova Reunião"}
        </Typography>

        <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 2, width: 0.8 }}>
          <CardContent>
            <MeetingGeneralSection 
              meeting={meeting}
              setMeeting={setMeeting}
              isEditable={isMeetingEditable}
            />
            
            <TopicSection
              meeting={meeting}
              setMeeting={setMeeting}
              isEditable={isMeetingEditable}
            />

            {
              isMeetingEditable ?
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveMeeting}
                  sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                >
                  Salvar
                </Button>
              </Box>
              : <></>
            }
            
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}
