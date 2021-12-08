import React from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ModalArticulo from '../componets/ModalArticulo'
import {useSelector} from 'react-redux'
import add from '../img/add.png';
import Dialogo from '../componets/Dialogo'

const ListarProductos = () => {

    const [openModal, setOpenModal] = React.useState(false);
    const [openDialogo, setOpenDialogo] = React.useState(false);
    const [renderModal, setRenderModar] = React.useState(false)
    const articulos = useSelector(store => store.articulos)
    const [item, setItem] = React.useState(null)
    const [editable, setEditable] = React.useState(false)
    const [articulosActivos, setArticulosActivos] = React.useState([])
    const [nombreArticulo, setNombreArticulo] = React.useState('')

    React.useEffect(() => {
        let arr = []
        articulos.map(item => item.activo && arr.push({
            id: item.id,
            nombre: item.nombre,
            costo: item.costo,
            iva: item.iva,
            precio: item.precio,
            activo: item.activo
        }))
        setArticulosActivos(arr)
    },[setArticulosActivos, articulos])

    const handleOpenModal = () => {
        setItem({})
        setOpenModal(true)
        setRenderModar(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false);
        setRenderModar(false)
        setEditable(false)
    }

    const handleOpenDialogo = () => {
        setOpenDialogo(true)

    }
    const handleCloseDialogo = () => {
        setOpenDialogo(false);
    }

    const enviarAEditar = ite => {
        setItem(ite)
        setOpenModal(true)
        setRenderModar(true)
        setEditable(true)
    }

    const enviarAEliminar = ite => {
        setItem(ite)
        setNombreArticulo(ite.nombre)
        handleOpenDialogo()
    }

    return (
        <div className="container mt-5 mb-5">
            <form className="form-control">
            <div className="row my-3">
                <div className="col text-end">

                    <Button variant="contained" color="success" onClick={handleOpenModal}>
                        Agregar
                    </Button>
                </div>
            </div>

            {
                articulosActivos.length === 0 ? (
                    <div className="container mt-3">
                        <h6>Precione el botón "Agregar" para añadir nuevos productos</h6>
                        <img src={add} className="text-center" alt="Añadir" width="50%"/>
                    </div>
                ) : (
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered dataTable">

                            <thead>
                                <tr>
                                    <th>Articulo</th>
                                    <th>Costo</th>
                                    <th>Precio con IVA (16%)</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    articulos.map(item => (
                                        item.activo === true ? (
                                            <>
                                                <tr key={item.id}>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.costo}</td>
                                                    <td>{item.precio}</td>
                                                    <td>
                                                        <Tooltip title="Editar articulo">
                                                            <IconButton onClick = {() => enviarAEditar(item)}>
                                                                    <EditIcon/>
                                                            </IconButton> 
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar articulo">
                                                            <IconButton onClick = {() => enviarAEliminar(item)}>
                                                                    <DeleteIcon/>
                                                            </IconButton> 
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            </>
                                        ): (null)
                                    )) 
                                }
                                
                            </tbody>

                        </table>
                    </div>)
            }


            </form>
            {
                renderModal ? (<ModalArticulo open = {openModal} handleClose = {handleCloseModal} handleOpen = {handleOpenModal} item = {item} editar = {editable}/>) : null
            }

            <Dialogo open = {openDialogo} handleClose ={handleCloseDialogo} handleOpen ={handleOpenDialogo} nombre = {nombreArticulo} item = {item}/>
            
        </div>


    )
}

export default ListarProductos
