import { IconButton, List, ListItem, ListItemText, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FileList({ files, isEditable, removeFile }) {

  const downloadFile = (file) => {
    const byteCharacters = atob(file.fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.fileType });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      {files?.length > 0 && (
        <List dense sx={{ backgroundColor: "#f9f9f9", mt: 2, mb: 2 }}>
          {files.map((file, fIndex) => (
            <ListItem
              key={fIndex}
              secondaryAction={
                isEditable ? (
                  <IconButton edge="end" color="error" onClick={() => removeFile(fIndex)}>
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
            >
              {file.id ? (
                <Link
                    component="button"
                    onClick={() => downloadFile(file)}
                    underline="hover"
                    sx={{ fontFamily: "Arial, sans-serif" }}
                >
                  {file.fileName}
                </Link>
              ) : (
                <ListItemText primary={file.name || file.fileName} />
              )}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
