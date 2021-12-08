import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { eliminarArticulo} from '../redux/articulosDuck';
import {useDispatch} from 'react-redux'

export default function AlertDialog(props) {

    const dispatch = useDispatch() //dispachador

    const eliminar = () => { //metodo para mandar a redux la baja logica
        dispatch(eliminarArticulo(props.item.id))
        props.handleClose()
    }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Eliminar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Seguro que quieres el eliminar el articulo <b>{props.nombre}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button onClick={eliminar} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}