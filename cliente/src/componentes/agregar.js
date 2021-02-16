import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

function Agregrar(props)  {
    const {
        handleSubmit,
        isSubmitting,
        isValid,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="input-field col s12" encType="multipart/form-data">
                    <Field
                        name="nombre"
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la tarea"
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
               
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Imagen</span>
                            <Field type="file" name="imagen"/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                                            
                </div>                                    
                <div className="col s12">    
                    <button 
                    type="submit" 
                    className=
                    {`submit ${isSubmitting || !isValid ? 'disabled' : ''} btn light-green darken-1`}
                    disabled={isSubmitting || !isValid}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
                           
    );    
};

export default withFormik({
    mapPropsToValues (){
        return{
            nombre: "",
            prioridad : "",
            fecha_vencimiento : "",
            imagen : ""    
        };
    },   

    async handleSubmit(values, formikBag){   
        const cookies = new Cookies();     
        await axios.post('http://localhost:3000/api/tarea', {
            nombre : values.nombre,
            prioridad : values.prioridad,
            fecha_vencimiento : values.fecha_vencimiento,
            imagen : values.imagen ,
            id_usuario : cookies.get('id')
        })
        .then(() => {
            M.toast({html : 'Tarea guardada'});
        }),
        await sleep(1000);
        location.reload('/inicio');   
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
})(Agregrar);