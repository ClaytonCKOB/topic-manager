import { IconButton, List, ListItem, ListItemText, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../dialog/DeleteDialog";
import { useState } from "react";

export default function FileList({ files, isEditable, removeFile }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [fileIndexToDelete, setFileIndexToDelete] = useState(null);

  const handleDeleteClick = (fIndex) => {
    setFileIndexToDelete(fIndex);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setFileIndexToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (fileIndexToDelete !== null) {
      removeFile(fileIndexToDelete);
    }
    setOpenDeleteModal(false);
    setFileIndexToDelete(null);
  };

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
        <List
          dense
          sx={{
            backgroundColor: "white",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid #e8e8e8",
            borderRadius: "4px",
            mt: 2,
            mb: 2
          }}
        >
          {files.map((file, fIndex) => (
            <ListItem
              key={fIndex}
              secondaryAction={
                isEditable ? (
                  <IconButton edge="end" color="error" onClick={() => handleDeleteClick(fIndex)}>
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
      <DeleteDialog
        openDeleteModal={openDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
