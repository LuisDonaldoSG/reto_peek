// super arreglo
const dataInicial = []

//tipos
const EDITAR_ARTICULOS = "EDITAR_ARTICULOS"
const ELIMINAR_ARTICULO = "ELIMINAR_ARTICULO"
const GUARDAR_ARTICULO = "GUARDAR_ARTICULO"

export default function reducerArticulo (state = dataInicial , action) {
    switch (action.type) {
        case GUARDAR_ARTICULO : 
            return [...state, {...action.payload}] //se insertan en el super arreglo los articulos nuevos
        case EDITAR_ARTICULOS : 
            return [...action.payload] //se insertan en el super arreglo los articulos actualizados
        case ELIMINAR_ARTICULO :
            return [...action.payload] //se insertan en el super arreglo los articulos actualizados solo con la baja logica
        default:
            return state
    }
}

//acciones de

export const guardarArticulo = (articulo) => (dispatch) =>{
    dispatch({ //inserción de datos al payload que se enviará al susper arreglo
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

    let editado = getState().articulos.map(item => //contruccion de los nuesvos datos
        articulo.id === item.id ? {
            id: articulo.id,
            nombre: articulo.nombre,
            costo: articulo.costo,
            iva: articulo.iva,
            precio: articulo.precio,
            activo: articulo.activo
        } : item
    )

    dispatch({ //actualizacion de datos al payload que se enviará al susper arreglo
        type: EDITAR_ARTICULOS,
        payload: editado
    })
}

export const eliminarArticulo = (id) => (dispatch, getState) => {
    let baja = getState().articulos.map(item => //creando la baja logica, poninedo el atributo activo en false
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
        type: ELIMINAR_ARTICULO, //actualizacion de datos al payload que se enviará al susper arreglo
        payload: baja
    })
}