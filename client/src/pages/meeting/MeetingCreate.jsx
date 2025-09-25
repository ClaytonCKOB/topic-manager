import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button, TextField, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

export default function MeetingCreate() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const meetingService = new MeetingService();
  const navigate = useNavigate();

  const redirectMeetingList = () => {
    navigate("/meeting/list");
  };

  const saveMeeting = async () => {
    let data = await meetingService.create(
      title,
      `${startDate?.toISOString().split("T")[0]}T${startTime?.toTimeString().slice(0,5)}`,
      `${endDate?.toISOString().split("T")[0]}T${endTime?.toTimeString().slice(0,5)}`
    );
    redirectMeetingList();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={redirectMeetingList}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Nova Reunião
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Preencha as informações para criar uma nova reunião.
        </Typography>

        <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>

            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <Typography  sx={{ mb: 1 }}>
                  Título da Reunião
                </Typography>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography  sx={{ mb: 1 }}>
                  Início da Reunião
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Data"
                      value={startDate}
                      onChange={setStartDate}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Hora"
                      value={startTime}
                      onChange={setStartTime}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography  sx={{ mb: 1 }}>
                  Fim da Reunião
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Data"
                      value={endDate}
                      onChange={setEndDate}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Hora"
                      value={endTime}
                      onChange={setEndTime}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} paddingTop={5}>
                <Grid item xs={12}>
                <Typography variant="h6"  gutterBottom>
                  Pautas da Reunião
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder="Adicione os itens da pauta..."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveMeeting}
            sx={{ borderRadius: 2, px: 4, py: 1.2 }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
