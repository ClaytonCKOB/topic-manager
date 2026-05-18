import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import TopicSection from '../topic/TopicSection';
import AuthService from '../../services/AuthService';
import MeetingGeneralSection from './MeetingGeneralSection';
import TopicService from '../../services/TopicService';
import ErrorMessage from '../../base/components/message/ErrorMessage';
import ParticipantVotesSection from '../participant/ParticipantVotesSection';
import TopicTotalizers from '../topic/TopicTotalizers';
import PdfGeneratorService from '../../services/PdfGeneratorService';

export default function MeetingCreate() {
  const { id } = useParams();
  const [isDetail, setIsDetail] = useState(false);
  const [isMeetingEditable, setIsMeetingEditable] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBasic, setIsLoadingBasic] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [meeting, setMeeting] = useState({
    title: "",
    description: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    topics: [{}],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const meetingService = new MeetingService();
  const authService = new AuthService();
  const topicService = new TopicService();
  const pdfGenerator = new PdfGeneratorService();
  const navigate = useNavigate();
  const redirectHome = () => navigate("/home");

  const getMeeting = async (meetingId) => {
    setIsLoadingBasic(true);
    try {
      const basicData = await meetingService.getBasic(meetingId);
      if (basicData) {
        const start = new Date(basicData.startDate.replace('T', ' ').replace(/-/g, '/'));
        const end = new Date(basicData.endDate.replace('T', ' ').replace(/-/g, '/'));

        setMeeting(prev => ({
          ...prev,
          id: basicData.id,
          title: basicData.title || "",
          startDate: start,
          startTime: start,
          endDate: end,
          endTime: end,
        }));

        const now = new Date();
        const meetingEnded = end < now;
        setIsMeetingEditable(authService.canChangeMeeting() && !meetingEnded);
      }
    } catch (error) {
      console.error("Error loading basic meeting info:", error);
    } finally {
      setIsLoadingBasic(false);
    }

    setIsLoadingDetails(true);
    try {
      const fullData = await meetingService.get(meetingId);
      if (fullData) {
        const start = new Date(fullData.startDate.replace('T', ' ').replace(/-/g, '/'));
        const end = new Date(fullData.endDate.replace('T', ' ').replace(/-/g, '/'));

        setMeeting(prev => ({
          ...prev,
          id: fullData.id,
          title: fullData.title || "",
          description: fullData.description || "",
          startDate: start,
          startTime: start,
          endDate: end,
          endTime: end,
          topics: fullData.topics || [],
          votes: fullData.votes,
          participants: fullData.participants
        }));
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao carregar os detalhes da reunião.",
        severity: "error",
      });
    } finally {
      setIsLoadingDetails(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsDetail(true);
      getMeeting(id);
    } else {
      const canEdit = authService.canChangeMeeting();
      setIsMeetingEditable(canEdit);
    }
  }, [id]);

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    const year = combined.getFullYear();
    const month = String(combined.getMonth() + 1).padStart(2, '0');
    const day = String(combined.getDate()).padStart(2, '0');
    const hours = String(combined.getHours()).padStart(2, '0');
    const minutes = String(combined.getMinutes()).padStart(2, '0');
    const seconds = String(combined.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const saveMeeting = async () => {
    setIsSaving(true);
    try {
      const start = combineDateTime(meeting.startDate, meeting.startTime);
      const end = combineDateTime(meeting.endDate, meeting.endTime);

      if (!start || !end || !meeting.title || !meeting.startDate || !meeting.endDate) {
        throw new Error("Preencha todos os campos obrigatórios antes de salvar.");
      }

      if (new Date(end) <= new Date(start)) {
        throw new Error("O horário de término deve ser após o horário de início.");
      }

      if (!isDetail) {
        let savedMeeting = await meetingService.create(
          meeting.title, start, end, meeting.topics
        );

        if (savedMeeting?.topics?.length > 0) {
          for (let topicIndex = 0; topicIndex < savedMeeting.topics.length; topicIndex++) {
            const savedTopic = savedMeeting.topics[topicIndex];
            const localTopic = meeting.topics[topicIndex];

            if (localTopic.files && localTopic.files.length > 0) {
              const updateFileProgress = (fileIndex, progress, uploading, error = false) => {
                setUploadProgress(prev => ({
                  ...prev,
                  [topicIndex]: {
                    ...prev[topicIndex],
                    [fileIndex]: { progress, uploading, error }
                  }
                }));

                setMeeting(prev => {
                  const newTopics = [...prev.topics];
                  newTopics[topicIndex].files[fileIndex] = {
                    ...newTopics[topicIndex].files[fileIndex],
                    progress,
                    uploading,
                    error
                  };
                  return { ...prev, topics: newTopics };
                });
              };

              await topicService.uploadFilesWithProgress(
                savedTopic.id,
                localTopic.files,
                updateFileProgress
              );
            }

            if (savedTopic.subtopics && savedTopic.subtopics.length > 0) {
              for (let subIndex = 0; subIndex < savedTopic.subtopics.length; subIndex++) {
                const savedSubtopic = savedTopic.subtopics[subIndex];
                const localSubtopic = localTopic.subtopics?.[subIndex];

                if (localSubtopic?.files && localSubtopic.files.length > 0) {
                  const updateSubFileProgress = (fileIndex, progress, uploading, error = false) => {
                    setMeeting(prev => {
                      const newTopics = [...prev.topics];
                      newTopics[topicIndex].subtopics[subIndex].files[fileIndex] = {
                        ...newTopics[topicIndex].subtopics[subIndex].files[fileIndex],
                        progress,
                        uploading,
                        error
                      };
                      return { ...prev, topics: newTopics };
                    });
                  };

                  await topicService.uploadFilesWithProgress(
                    savedSubtopic.id,
                    localSubtopic.files,
                    updateSubFileProgress
                  );
                }
              }
            }
          }
        }
      } else {
        await meetingService.update(meeting);

        const updatedMeeting = await meetingService.get(meeting.id);
        await topicService.uploadFilesForTopics(updatedMeeting.topics, meeting.topics);
      }

      setUploadProgress({});
      redirectHome();

    } catch (error) {
      console.error("Erro ao salvar reunião:", error);
      setSnackbar({
        open: true,
        message: error.message || "Ocorreu um erro ao salvar a reunião.",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const expandAllTopics = () => {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
      const hasExpandMoreIcon = button.querySelector('[data-testid="ExpandMoreIcon"]');
      if (hasExpandMoreIcon) {
        button.click();
      }
    });

    setTimeout(() => {
      const participantButtons = document.querySelectorAll('button');
      participantButtons.forEach(button => {
        const hasKeyboardArrowDown = button.querySelector('[data-testid="KeyboardArrowDownIcon"]');
        if (hasKeyboardArrowDown) {
          button.click();
        }
      });
    }, 200);
  };

  const downloadPdf = async () => {
    setIsGeneratingPdf(true);

    try {
      expandAllTopics();
      await new Promise(resolve => setTimeout(resolve, 800));
      await pdfGenerator.generateMeetingPdf(meeting);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setSnackbar({
        open: true,
        message: "Erro ao gerar PDF. Tente novamente.",
        severity: "error",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
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
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={redirectHome}
              sx={{
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

            {isDetail && !isLoadingBasic && !isLoadingDetails && (
              <Button
                variant="contained"
                startIcon={isGeneratingPdf ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                onClick={downloadPdf}
                disabled={isGeneratingPdf}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)"
                  }
                }}
              >
                {isGeneratingPdf ? 'Gerando PDF...' : 'Download PDF'}
              </Button>
            )}
          </Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {isDetail ? "Detalhes da Reunião" : "Nova Reunião"}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {isDetail ? "Visualize e edite informações da reunião" : "Configure os detalhes da nova reunião"}
          </Typography>
        </Box>

        <Box p={4}>
          {isLoadingBasic ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Card sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', boxShadow: 'none'}}>
              <Card id="pdf-content" sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 2, width: 0.8, maxWidth: 1300 }}>
                <CardContent>
                  <MeetingGeneralSection
                    meeting={meeting}
                    setMeeting={setMeeting}
                    isEditable={isMeetingEditable}
                  />

                  {isLoadingDetails ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh" mt={3}>
                      <CircularProgress size={50} />
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        Carregando tópicos e participantes...
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <TopicTotalizers topics={meeting.topics} />

                      <ParticipantVotesSection
                        participants={meeting.participants}
                        topics={meeting.topics}
                      />

                      <TopicSection
                        meeting={meeting}
                        setMeeting={setMeeting}
                        isEditable={isMeetingEditable}
                      />
                      
                    </>
                  )}

                  {isMeetingEditable && (
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={saveMeeting}
                        disabled={isSaving}
                        startIcon={isSaving && <CircularProgress size={20} color="inherit" />}
                        sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                      >
                        {isSaving ? 'Salvando...' : 'Salvar'}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Card>
          )}
        </Box>
        <ErrorMessage
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
      </Box>
    </LocalizationProvider>
  );
}
