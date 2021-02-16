import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

function Registro(props) {
    const {
        handleSubmit,
        isSubmitting,
        isValid,
    } = props;
    
    return (
    <div className="modal-content">
        <div className="card-content">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Nombres</label>
                    <Field
                        name="nombre"
                        type="text"
                        className="form-control"
                        placeholder="Nombres"
                    />
                    <ErrorMessage name="nombre">
                        {messages => 
                            <strong>{messages}</strong> 
                        }                                
                    </ErrorMessage>                        
                </div>

                <div className="form-field">
                    <label>Apellidos</label>
                    <Field
                        name="apellido"
                        type="text"
                        className="form-control"
                        placeholder="apellido"
                    />
                    <ErrorMessage name="apellido">
                        {messages => 
                            <strong>{messages}</strong>  
                        }                                
                    </ErrorMessage>                        
                </div>

                <div className="form-field">
                    <label>Correo</label>
                    <Field
                        name="correo"
                        type="email"
                        className="form-control mail"
                        placeholder="Correo"
                    />
                    <ErrorMessage name="correo">
                        {messages =>
                            <strong>{messages}</strong> 
                        }                                
                    </ErrorMessage>                        
                </div>

                <div className="form-field">
                    <label>Contraseña</label>
                    <Field 
                        name="contraseña"
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                    />
                    <br/>
                    <ErrorMessage name="contraseña">
                        { messages => 
                            <strong>{messages}</strong>     
                        }                                
                    </ErrorMessage>  
                </div>                  
                
                <div className="modal-footer">
                    <div className="form-field">    
                        <button 
                            type="submit" 
                            className=
                            {`submit ${isSubmitting || !isValid ? 'disabled' : ''} btn-large waves-effect waves-dark ml-1`}
                            disabled={isSubmitting || !isValid}>
                                Registrarse
                        </button>                        
                        <button type="button" href="/" className="modal-close btn-large waves-effect waves-dark" style={{margin : '4px'}}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};

export default withFormik({
    mapPropsToValues (){
        return{
            correo : "",
            contraseña : "",
            nombre : "",
            apellido : ""
        };
    },

    async validate(values){
        const errors = {};
        (!values.correo) ? errors.correo = "El correo es requerido." : 
        (values.correo.length < 5) ? errors.correo = "El correo debe tener minimo cinco caracteres.":
        true;

        (!values.nombre) ? errors.nombre = "El nombre es requerido." : 
        (values.nombre.length < 3) ? errors.nombre = "El nombre debe tener minimo tres caracteres.":
        true;

        (!values.apellido) ? errors.apellido = "El apellido es requerido." : 
        (values.apellido.length < 5) ? errors.apellido = "El apellido debe tener minimo cinco caracteres.":
        true;

        (!values.contraseña) ? errors.contraseña = "La contraseña es requerida." : 
        (values.contraseña.length < 3) ? errors.contraseña = "la contraseña debe tener minimo cinco caracteres.":
        true;
        return errors;
    },  

    async handleSubmit(values, formikBag){
        await axios.post(`http://localhost:3000/api/usuario`,{
            nombre : values.nombre,
            apellido : values.apellido,
            correo : values.correo,
            contraseña : values.contraseña
        })
        .then(() => {
            M.toast({html : 'Registro exitoso'});
        });
        await sleep(1000);
        location.reload('/inicio');

        formikBag.setSubmitting(false);      
    },    
}) (Registro);