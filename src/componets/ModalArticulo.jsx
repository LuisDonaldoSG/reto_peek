import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {styleModal , styleFormModal} from '../configstyle/style'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from 'react-redux'
import { guardarArticulo, editarArticulo } from '../redux/articulosDuck';
import {nanoid} from 'nanoid'

const ModalArticulo = (props) => {

    const dispatch = useDispatch()

    const [mostrar, setMostrar] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    
    const [nombre , setNombre] = React.useState('')
    const [costo,  setCosto] = React.useState('')
    const [precio, setPrecio] = React.useState(0.0)
    const [iva, setIva] = React.useState(0.16)
    const [guardar, setGuardar] = React.useState(false)

    React.useEffect (() => {

        if (Object.keys(props.item).length > 0 ){
            setNombre(props.item.nombre)
            setCosto(props.item.costo)
            setPrecio(props.item.precio)
        }

    },[props.item.nombre, props.item.costo, props.item.precio, props.item])

    const validar = () => {
        
        if (!nombre.trim()){
            setMostrar(true)
            setMensaje("El nombre no debe estar vacio")
            return
        }

        if (nombre.trim().length > 30) {
            setMostrar(true)
            setMensaje("El tamaño maximo del nombre debe ser de 30")
            return
        }
        
        let costoFloat = parseFloat(costo.trim())

        if (isNaN(costoFloat)){
            setMostrar(true)
            setMensaje("solo puede escribir numeros enteros y numeros con decimales")
            return
        }

        let ivaCalculada = costoFloat*iva
        setIva(ivaCalculada)
        setPrecio(ivaCalculada + costoFloat)
        setGuardar(true)
    }

    const guardarArti = () => {

        let precioFloat = parseFloat(precio)

        if (isNaN(precioFloat)){
            setMostrar(true)
            setMensaje("solo puede escribir numeros enteros y numeros con decimales")
            return
        }

        dispatch(guardarArticulo({
            id: nanoid(),
            nombre: nombre, 
            costo: costo,
            iva: iva, 
            precio: precio}
        ))

        setGuardar(false)
        setNombre('')
        setCosto('')
        setIva(0.16)
        setPrecio(0)
        props.handleClose()
    }

    const editarArti = () => {

        let precioFloat = parseFloat(precio)

        if (isNaN(precioFloat)){
            setMostrar(true)
            setMensaje("solo puede escribir numeros enteros y numeros con decimales")
            return
        }

        dispatch(editarArticulo({
            id : props.item.id, 
            nombre: nombre, 
            costo:costo, 
            iva: iva, 
            precio:precio, 
            activo: true
        }))

        props.handleClose()
    }

    return (
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
             >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {
                            props.editar ? 'Editar producto' : 'Agregar producto'
                        }
                    </Typography>
                    <TextField id="standard-basic" label="Nombre de producto" variant="standard" sx = {styleFormModal} onChange={event => setNombre(event.target.value)} value = {nombre}/>
                    <TextField id="standard-basic" label="Costo" variant="standard" sx = {styleFormModal} onChange={event => setCosto(event.target.value)} value = {costo}/>
                    <TextField id="standard-basic" label="IVA - 16%" variant="standard" sx = {styleFormModal} disabled value = {iva} />
                    <TextField id="standard-basic" label="Precio" variant="standard"  sx = {styleFormModal} onChange={event => setPrecio(event.target.value)} value = {precio} />

                    <br />

                    {
                        guardar === false ? (
                            <Button 
                                variant="contained"  
                                sx = {styleFormModal} 
                                onClick={validar}>
                                Calcular
                            </Button>) : (
                            <Button 
                                variant="contained" 
                                color="success" 
                                onClick = {props.editar ? editarArti : guardarArti}
                                sx = {styleFormModal} >
                                {
                                    props.editar ? 'Editar' : 'Agregar'
                                }
                            </Button>)
                            }

                    <Collapse in={mostrar}>
                    <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setMostrar(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    >
                    {mensaje}
                    </Alert>
                </Collapse>
                </Box>
                
            </Modal>
            
    )
}

export default ModalArticulo
