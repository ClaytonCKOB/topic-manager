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

export default function MeetingGeneralSection({meeting, setMeeting}) {
    
    return <>
    <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sx={{width: 0.4}}>
        <Typography sx={{ mb: 1 }}>Título da Reunião</Typography>
        <TextField
            fullWidth
            value={meeting.title}
            onChange={(e) =>
            setMeeting((prev) => ({ ...prev, title: e.target.value }))
            }
        />
        </Grid>
    </Grid>
    <Grid container spacing={4} mb={5} sx={{display: "flex", justifyContent: "space-between"}}>
        <Grid item xs={12} md={6}>
        <Typography sx={{ mb: 1 }}>Início da Reunião</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <DatePicker
                label="Data"
                value={meeting.startDate}
                onChange={(date) =>
                setMeeting((prev) => ({ ...prev, startDate: date }))
                }
                slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TimePicker
                label="Hora"
                value={meeting.startTime}
                onChange={(time) =>
                setMeeting((prev) => ({ ...prev, startTime: time }))
                }
                slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
        </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
        <Typography sx={{ mb: 1 }}>Fim da Reunião</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <DatePicker
                label="Data"
                value={meeting.endDate}
                onChange={(date) =>
                setMeeting((prev) => ({ ...prev, endDate: date }))
                }
                slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TimePicker
                label="Hora"
                value={meeting.endTime}
                onChange={(time) =>
                setMeeting((prev) => ({ ...prev, endTime: time }))
                }
                slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    </>;
}