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
import TopicService from '../../services/TopicService';

export default function MeetingCreate() {
  const { id } = useParams();
  const [isDetail, setIsDetail] = useState(false);
  const [isMeetingEditable, setIsMeetingEditable] = useState(true);
  const [meeting, setMeeting] = useState({
    title: "",
    description: "",
    startDate: null,
    startTime: null,
    endTime: null,
    topics: [{}],
  });

  const meetingService = new MeetingService();
  const authService = new AuthService();
  const topicService = new TopicService();
  const navigate = useNavigate();
  const redirectHome = () => navigate("/home");

  const getMeeting = async (meetingId) => {
    const data = await meetingService.get(meetingId);
    if (data) {
      const start = new Date(data.startDate);
      setMeeting({
        id: data.id,
        title: data.title || "",
        description: data.description || "",
        startDate: start,
        startTime: start,
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
    return combined.toISOString().slice(0, -1);;
  };

  const saveMeeting = async () => {
    const start = combineDateTime(meeting.startDate, meeting.startTime);
    const end = combineDateTime(meeting.startDate, meeting.endTime);
    if (!isDetail) {
      let savedMeeting = await meetingService.create(meeting.title, start, end, meeting.topics);

      if (savedMeeting?.topics?.length > 0) {
        for (let topicIndex = 0; topicIndex < savedMeeting.topics.length; topicIndex++) {
          const savedTopic = savedMeeting.topics[topicIndex];
          const localTopic = meeting.topics[topicIndex];

          if (localTopic.files && localTopic.files.length > 0) {
            await topicService.saveFiles(savedTopic.id, localTopic.files);
          }

          if (savedTopic.subtopics && savedTopic.subtopics.length > 0) {
            for (let subIndex = 0; subIndex < savedTopic.subtopics.length; subIndex++) {
              const savedSubtopic = savedTopic.subtopics[subIndex];
              const localSubtopic = localTopic.subtopics?.[subIndex];

              if (localSubtopic?.files && localSubtopic.files.length > 0) {
                await topicService.saveFiles(savedSubtopic.id, localSubtopic.files);
              }
            }
          }
        }
      }

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
