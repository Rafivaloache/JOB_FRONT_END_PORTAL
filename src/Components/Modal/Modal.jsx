import { Box, Button, Modal, Typography } from '@mui/material';

import React from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
  width: '92%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MuiModal = ({handleOpen, handleClose, open}) => {
   
    return (
       <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            WELCOME TO OUR SITE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Please Fill up the form
          </Typography>
        </Box>
      </Modal>
    </div>
    );
};

export default MuiModal;