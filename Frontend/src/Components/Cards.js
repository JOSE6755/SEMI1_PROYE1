import React from 'react'
import { Link } from 'react-router-dom';
import logopdf from "../Images/PDF.png";
import "../Styles/Cards.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Cards({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function verFile() {
    console.log(data)
  }


  return (
    <div className="Card_container">
      <div className="left_side_image">
        <img src={logopdf} alt="pdf" />
      </div>
      <div className="card_right_side">
        <p>Nombre:{data.name}</p>
        <p>Propietario: {data.propietario}</p>
        <p>Fecha de creacion: {data.fecha_creacion}</p>
        <p>Fecha de modificacion: {data.fecha_modificacion}</p>

        <button onClick={handleOpen}>Ver</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {data.ext === '.pdf' && <embed type="application/pdf" style={{ width: 700, height: 600 }} src={'https://docs.google.com/viewer?url=' + data.url + '&embedded=true'} />}
            {data.ext === '.txt' && <embed type="text/html" style={{ width: 300, height: 300 }} src={'https://docs.google.com/viewer?url=' + data.url + '&embedded=true'} />}
            {data.ext !== '.pdf' && <img className='img2' src={data.url}></img>}
          </Box>
        </Modal>

      </div>


    </div>
  );
}
