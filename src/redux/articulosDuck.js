// super arreglo
const dataInicial = []

//tipos
const EDITAR_ARTICULOS = "EDITAR_ARTICULOS"
const ELIMINAR_ARTICULO = "ELIMINAR_ARTICULO"
const GUARDAR_ARTICULO = "GUARDAR_ARTICULO"

export default function reducerArticulo (state = dataInicial , action) {
    switch (action.type) {
        case GUARDAR_ARTICULO :
            return [...state, {...action.payload}]
        case EDITAR_ARTICULOS :
            return [...action.payload]
        case ELIMINAR_ARTICULO :
            return [...action.payload]
        default:
            return state
    }
}

//acciones de

export const guardarArticulo = (articulo) => (dispatch) =>{
    dispatch({
        type: GUARDAR_ARTICULO,
        payload: {
            id: articulo.id,
            nombre: articulo.nombre,
            costo: articulo.costo,
            iva: articulo.iva,
            precio: articulo.precio,
            activo: true
        }
    })
}

export const editarArticulo = (articulo) => (dispatch, getState) => {

    let editado = getState().articulos.map(item => 
        articulo.id === item.id ? {
            id: articulo.id,
            nombre: articulo.nombre,
            costo: articulo.costo,
            iva: articulo.iva,
            precio: articulo.precio,
            activo: articulo.activo
        } : item
    )

    dispatch({
        type: EDITAR_ARTICULOS,
        payload: editado
    })
}

export const eliminarArticulo = (id) => (dispatch, getState) => {
    let baja = getState().articulos.map(item => 
        id === item.id ? {
            id: item.id,
            nombre: item.nombre,
            costo: item.costo,
            iva: item.iva,
            precio: item.precio,
            activo: false
        } : item
    )
    dispatch({
        type: ELIMINAR_ARTICULO,
        payload: baja
    })
}