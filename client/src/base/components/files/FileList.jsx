import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FileList({files, isEditable, removeFile}) {
    return <>
    {files?.length > 0 && (
        <List dense sx={{backgroundColor: "#f9f9f9"}} mt={2} mb={2}>
        {files.map((file, fIndex) => (
            <ListItem
            key={fIndex}
            secondaryAction={
                isEditable ?
                <IconButton edge="end" color="error" onClick={() => removeFile(fIndex)}>
                    <DeleteIcon />
                </IconButton>
                : <></>
            }
            >
            <ListItemText primary={file.name} />
            </ListItem>
        ))}
        </List>
    )}
    </>;
}
