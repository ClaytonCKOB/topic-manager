import { Grid, IconButton, Typography, Box, Collapse } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import VoteComponent from "../../base/components/vote/VoteComponent";
import formatDate from "../../utils/FormatDate";

export default function ParticipantVotesSection({ participants, topics }) {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    const buildTopicList = () => {
        const topicList = [];
        topics?.forEach((topic, index) => {
            if (topic) {
                topicList.push({
                    id: topic.id,
                    title: topic.title,
                    sequence: (index + 1).toString(),
                    votes: topic.votes || []
                });

                topic.subtopics?.forEach((subtopic, subIndex) => {
                    if (subtopic) {
                        topicList.push({
                            id: subtopic.id,
                            title: subtopic.title,
                            sequence: `${index + 1}.${subIndex + 1}`,
                            votes: subtopic.votes || []
                        });
                    }
                });
            }
        });
        return topicList;
    };

    const buildParticipantData = () => {
        if (!participants || participants.length === 0) return [];

        const topicList = buildTopicList();
        const totalTopics = topicList.length;

        return participants.map((participant) => {
            const participantVotes = topicList.map((topic) => {
                const vote = topic.votes.find(v => v.user?.id === participant.id);
                return {
                    topicId: topic.id,
                    topicTitle: topic.title,
                    sequence: topic.sequence,
                    status: vote?.status,
                    comment: vote?.comment || "",
                    timestamp: vote?.updatedDate || null,
                    hasVoted: vote !== undefined
                };
            });

            const votedCount = participantVotes.filter(v => v.hasVoted).length;

            return {
                id: participant.id,
                name: participant.name,
                role: participant.role,
                totalTopics,
                votedTopics: votedCount,
                progress: `${votedCount}/${totalTopics}`,
                votes: participantVotes
            };
        });
    };

    const participantData = buildParticipantData();

    const toggleRowExpansion = (participantId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [participantId]: !prev[participantId]
        }));
    };

    const mainColumns = [
        {
            field: 'expand',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    onClick={() => toggleRowExpansion(params.row.id)}
                >
                    {expandedRows[params.row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            )
        },
        { field: 'name', headerName: 'Usuário', flex: 0.4 },
        { field: 'role', headerName: 'Função', align: 'center', flex: 0.25 },
        { field: 'progress', headerName: 'Progresso de Votação', align: 'center', flex: 0.25 }
    ];

    const voteColumns = [
        {
            field: 'sequence',
            headerName: 'Pauta',
            width: 80,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'topicTitle',
            headerName: 'Título',
            flex: 0.3
        },
        {
            field: 'status',
            headerName: 'Voto',
            flex: 0.2,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) =>
                params.value !== undefined ? (
                    <VoteComponent voteId={params.value} hasBorder={false} />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Não votou
                    </Typography>
                )
        },
        {
            field: 'comment',
            headerName: 'Comentário',
            flex: 0.3,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    title={params.value}
                >
                    {params.value || '-'}
                </Typography>
            )
        },
        {
            field: 'timestamp',
            headerName: 'Horário',
            flex: 0.2,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const formatted = params.value ? formatDate(params.value) : '-';
                return <Typography variant="body2">{formatted}</Typography>;
            }
        }
    ];

    return participantData.length > 0 ? (
        <Grid
            sx={{
                border: '2px solid transparent',
                borderRadius: 1,
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(44, 62, 80, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%) border-box',
            }}
            p={4}
            mb={4}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                mb={!collapsed ? 3 : 0}
            >
                <Typography variant="h6">Participantes da Reunião</Typography>

                <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Grid>

            {!collapsed && (
                <Box>
                    {participantData.map((participant) => (
                        <Box
                            key={participant.id}
                            sx={{
                                mb: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                overflow: 'hidden',
                                '&:hover': {
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    backgroundColor: expandedRows[participant.id] ? '#f8f9fa' : 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onClick={() => toggleRowExpansion(participant.id)}
                            >
                                <IconButton size="small" sx={{ mr: 2 }}>
                                    {expandedRows[participant.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>

                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Typography variant="body1" fontWeight={500} sx={{ minWidth: 200 }}>
                                        {participant.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                                        {participant.role}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color={participant.votedTopics === participant.totalTopics ? 'success.main' : 'warning.main'}
                                        fontWeight={600}
                                        sx={{ ml: 'auto' }}
                                    >
                                        Votos: {participant.progress}
                                    </Typography>
                                </Box>
                            </Box>

                            <Collapse in={expandedRows[participant.id]} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 3, pt: 2, backgroundColor: '#fafafa' }}>
                                    <DataGrid
                                        rows={participant.votes}
                                        columns={voteColumns}
                                        disableRowSelectionOnClick
                                        hideFooter
                                        autoHeight
                                        getRowId={(row) => `${participant.id}-${row.topicId}`}
                                        sx={{
                                            border: 'none',
                                            backgroundColor: 'white',
                                            borderRadius: 1,
                                            '& .MuiDataGrid-cell': {
                                                borderBottom: '1px solid #f0f0f0'
                                            },
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: 0
                                            }
                                        }}
                                    />
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
        </Grid>
    ) : null;
}
