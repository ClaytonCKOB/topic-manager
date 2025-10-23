import { Grid} from "@mui/material";
import TopicComponent from "./TopicComponent";

export default function TopicCard({meeting, setMeeting, topic, index, isEditable}) {
  return (
    <Grid key={index}>
      <TopicComponent
        setMeeting={setMeeting}
        topic={topic}
        index={index}
        isEditable={isEditable}
      />
      <Grid sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
        {topic.subtopics?.map((subtopic, sub_index) => (
          <TopicComponent 
            setMeeting={setMeeting}
            index={index}
            subIndex={sub_index}
            topic={subtopic}
            isSubTopic={true}
            isEditable={isEditable}
          />
        ))}
      </Grid>
    </Grid>
  );
}
