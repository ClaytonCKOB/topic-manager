import { IconButton, List, ListItem, ListItemText, Link, Checkbox, Button, Box, Typography, Chip, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../dialog/DeleteDialog";
import TopicService from "../../../services/TopicService";
import { useState } from "react";

export default function FileList({ files, isEditable, removeFile }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [fileIndexToDelete, setFileIndexToDelete] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const topicService = new TopicService();

  const handleDeleteClick = (fIndex) => {
    setFileIndexToDelete(fIndex);
    setIsBulkDelete(false);
    setOpenDeleteModal(true);
  };

  const handleBulkDeleteClick = () => {
    setIsBulkDelete(true);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setFileIndexToDelete(null);
    setIsBulkDelete(false);
  };

  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      removeFile(selectedFiles);
      setSelectedFiles([]);
    } else if (fileIndexToDelete !== null) {
      removeFile([fileIndexToDelete]);
    }
    setOpenDeleteModal(false);
    setFileIndexToDelete(null);
    setIsBulkDelete(false);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedFiles(files.map((_, index) => index));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fIndex) => {
    setSelectedFiles(prev => {
      if (prev.includes(fIndex)) {
        return prev.filter(i => i !== fIndex);
      } else {
        return [...prev, fIndex];
      }
    });
  };

  const getDeleteMessage = () => {
    if (isBulkDelete) {
      const count = selectedFiles.length;
      return `Tem certeza que deseja remover ${count} arquivo${count > 1 ? 's' : ''}?`;
    }
    return "Tem certeza que deseja remover este item?";
  };

  const downloadFile = (file) => {
    topicService.downloadFile(file);
  };

  return (
    <>
      {files?.length > 0 && (
        <>
          {isEditable && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, mt: 1, ml: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={selectedFiles.length === files.length && files.length > 0}
                  indeterminate={selectedFiles.length > 0 && selectedFiles.length < files.length}
                  onChange={handleSelectAll}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Arquivos ({files.length})
                </Typography>
              </Box>
              {selectedFiles.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={handleBulkDeleteClick}
                  sx={{ textTransform: 'none' }}
                >
                  Remover Selecionados ({selectedFiles.length})
                </Button>
              )}
            </Box>
          )}
          <List
            dense
            sx={{
              backgroundColor: "white",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #e8e8e8",
              borderRadius: "4px",
              mt: isEditable ? 1 : 2,
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
                {isEditable && (
                  <Checkbox
                    checked={selectedFiles.includes(fIndex)}
                    onChange={() => handleSelectFile(fIndex)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                )}
                {file.id ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                    <Link
                      component="button"
                      onClick={() => downloadFile(file)}
                      underline="hover"
                      sx={{ fontFamily: "Arial, sans-serif" }}
                    >
                      {file.fileName}
                    </Link>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ListItemText primary={file.name || file.fileName} />
                      <Chip
                        label="Pendente upload"
                        size="small"
                        color="warning"
                        variant="outlined"
                        sx={{ height: 20 }}
                      />
                    </Box>
                    {file.uploading && (
                      <Box sx={{ width: "100%", pr: 6 }}>
                        <LinearProgress variant="determinate" value={file.progress || 0} />
                      </Box>
                    )}
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </>
      )}
      <DeleteDialog
        openDeleteModal={openDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        message={getDeleteMessage()}
      />
    </>
  );
}
