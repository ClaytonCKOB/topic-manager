import { Box, Typography } from "@mui/material";

export default function TotalVotes({ icon: Icon, votes, text, subtext, color = "primary" }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <Icon sx={{ fontSize: 32, color: `${color}.main`, mb: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="text.primary" mb={0.5}>
                {votes || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {text}
            </Typography>
            {subtext && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {subtext}
                </Typography>
            )}
        </Box>
    );
}