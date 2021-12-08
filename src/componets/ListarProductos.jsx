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
    //Inicializacion de estados
    const [openModal, setOpenModal] = React.useState(false);
    const [openDialogo, setOpenDialogo] = React.useState(false);
    const articulos = useSelector(store => store.articulos) //arreglo original de los registros
    const [item, setItem] = React.useState([])
    const [editable, setEditable] = React.useState(false)
    const [articulosActivos, setArticulosActivos] = React.useState([])
    const [nombreArticulo, setNombreArticulo] = React.useState('')

    React.useEffect(() => { //cuando re denderice el componente asigna registros a un arreglo temporal que serpá el que se pinte
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

    const handleOpenModal = () => { //metodo para abrir el modal
        setItem({})
        setOpenModal(true)
    }

    const handleCloseModal = () => { //metodo para abrir el modal
        setOpenModal(false)
        setEditable(false)
    }

    const handleOpenDialogo = () => { //metodo para abrir el dialogo
        setOpenDialogo(true)

    }

    const handleCloseDialogo = () => { //metodo para cerrar el dialogo
        setOpenDialogo(false)
    }

    const enviarAEditar = ite => { //metodo que se ejecuta al dar click en el ícono de editar abriendo el modal, cambiando el estado editable a true y carturando valores de la filla en item 
        setItem(ite)
        setOpenModal(true)
        setEditable(true)
    }

    const enviarAEliminar = ite => { //metodo que se ejecuta al dar click en el ícono de eliminar abriendo el dialogo y carturando valores de la filla en item 
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
                articulosActivos.length === 0 ? ( //si el arreglo temporal no tiene nada se pinta una imagen
                    <div className="container mt-3">
                        <h6>Precione el botón "Agregar" para añadir nuevos productos</h6>
                        <img src={add} className="text-center" alt="Añadir" width="50%"/>
                    </div>
                ) : ( //si el arreglo temporal tiene datos los pinta
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
                                        item.activo === true ? ( //iteracion para llenar la tabla con los datos 
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

            <ModalArticulo open = {openModal} handleClose = {handleCloseModal} handleOpen = {handleOpenModal} item = {item} editar = {editable}/>


            <Dialogo open = {openDialogo} handleClose ={handleCloseDialogo} handleOpen ={handleOpenDialogo} nombre = {nombreArticulo} item = {item}/>
            
        </div>


    )
}

export default ListarProductos
