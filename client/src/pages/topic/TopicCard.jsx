import { Grid, Box, Typography } from "@mui/material";
import { useState } from 'react';
import TopicComponent from "./TopicComponent";

export default function TopicCard({setMeeting, topic, index, isEditable}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;

  return (
    <Grid key={index}>
      <TopicComponent
        setMeeting={setMeeting}
        topic={topic}
        index={index}
        isEditable={isEditable}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hasSubtopics={hasSubtopics}
        subtopicsCount={topic.subtopics?.length || 0}
      />

      {hasSubtopics && isExpanded && (
        <Box sx={{ position: 'relative', ml: 3 }}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: '#9e9e9e'
            }}
          />

          <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {topic.subtopics.map((subtopic, sub_index) => (
              <Box key={sub_index} sx={{ position: 'relative', ml: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: -24,
                    top: '24px',
                    width: '24px',
                    height: '2px',
                    backgroundColor: '#9e9e9e'
                  }}
                />

                <TopicComponent
                  setMeeting={setMeeting}
                  index={index}
                  subIndex={sub_index}
                  topic={subtopic}
                  isSubTopic={true}
                  isEditable={isEditable}
                  backgroundColor="#fafafa"
                />
              </Box>
            ))}
          </Grid>
        </Box>
      )}
    </Grid>
  );
}
