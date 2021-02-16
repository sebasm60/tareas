import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Editar(props)  {

    const {
        handleSubmit,
        isSubmitting,
        isValid,
    } = props;
        
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    <Field
                        name="nombre"
                        type="text"
                        className="form-control"
                    />
                    <br/>
                    <ErrorMessage name="nombre">
                        { messages => <strong> {messages} </strong> }                                
                    </ErrorMessage>                                  
                </div>
                <div className="input-field col s12">
                    <Field
                        name="prioridad"
                        type="text"
                        className="form-control"
                        placeholder="Prioridad"
                    />
                    <ErrorMessage name="prioridad">
                        { messages => <strong> {messages} </strong> }                                
                    </ErrorMessage>                                               
                </div>
                <div className="input-field col s12">
                    <Field
                        name="fecha_vencimiento"
                        type="date"
                        className="form-control"
                        placeholder="Fecha de vencimiento"
                    />
                    <ErrorMessage name="fecha_vencimiento">
                        { messages => <strong> {messages} </strong> }                                
                    </ErrorMessage>                                                
                </div>
                <div className="input-field col s12">
                    <Field
                        name="imagen"
                        type="text"
                        className="form-control"
                        placeholder="imagen"
                    />
                    <ErrorMessage name="imagen">
                        { messages => <strong> {messages} </strong> }                                
                    </ErrorMessage>                                              
                </div>                                    

                <div className="modal-footer">
                    <div className="form-field">    
                    <button 
                        type="submit" 
                        className=
                        {`submit ${isSubmitting || !isValid ? 'disabled' : ''} btn-large light-green darken-1`}
                        disabled={isSubmitting || !isValid}
                        >
                            Save
                    </button>                       
                        <button type="button" onClick={() =>{location.reload();}} className="modal-close btn-large waves-effect waves-dark" style={{margin : '4px'}}>Cancelar</button>
                    </div>
                </div>

            </div>
        </form>
                           
    );    
};

export default withFormik({

    mapPropsToValues (){
        const cookies = new Cookies(); 
        return{
            nombre: cookies.get('nombretarea'),
            prioridad : cookies.get('prioridad'),
            fecha_vencimiento : cookies.get('fecha_vencimiento'),
            imagen : cookies.get('imagen')    
        };
    },

    async handleSubmit(values, formikBag){ 
        const cookies = new Cookies();       
        await axios.put(`http://localhost:3000/api/tarea/${cookies.get('idtarea')}`, {
            nombre : values.nombre,
            prioridad : values.prioridad,
            fecha_vencimiento : values.fecha_vencimiento,
            imagen : values.imagen            
        })
        .then(() => {
           location.reload('/inicio');
            M.toast({html :'Tarea guardada'});
        })
        .then(() => {
            cookies.remove('nombretarea', {path:"/"});
            cookies.remove('prioridad',  {path:"/"});
            cookies.remove('fecha_vencimiento',  {path:"/"});
            cookies.remove('imagen',{path:"/"});
            cookies.remove('idtarea',{path:"/"});
            
        });
        formikBag.setSubmitting(false);
        
    },

    async validate(values){
        const errors = {};
        (!values.nombre) ? errors.nombre = "El nombre es requerido." : 
            (values.nombre.length < 1) ? errors.nombre = "El campo nombre debe tener mino 1 caracter.":
            true;

        (!values.prioridad) ? errors.prioridad = "La prioridad es requerida" : 
            (values.prioridad.length < 1) ? errors.prioridad = "El campo prioridad requiere minimo un caracter.":
            true;

        (!values.fecha_vencimiento) ? errors.fecha_vencimiento = "La fecha de vencimiento es requerida." : 
            (values.fecha_vencimiento.length < 1) ? errors.fecha_vencimiento = "El campo fecha de vencimiento requiere minimo un caracter.":
            true;

        (!values.imagen) ? errors.imagen = "La imagen es requerida." : 
            (values.imagen.length < 4) ? errors.imagen = "Se requiere la imagen.":
            true;   

        return errors;
    },
})(Editar);