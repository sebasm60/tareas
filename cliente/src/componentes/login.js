import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login(props)  {
    const {
        handleSubmit,
        isSubmitting,
        isValid,
    } = props;

    return (
        <div className="card-content"> 
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Correo</label>
                    <Field
                        name="correo"
                        type="email"
                        className="form-control"
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

                <div className="form-field">    
                    <button 
                    type="submit" 
                    className=
                    {`submit ${isSubmitting || !isValid ? 'disabled' : ''} btn-large waves-effect waves-dark` }
                
                    disabled={isSubmitting || !isValid}
                    >
                        Login
                    </button>
            </div>
        </form>
    </div>           
    );    
};

export default withFormik({

    mapPropsToValues (){
        return{
            correo : "",
            contraseña : "" 
        };
    },
    
    async validate(values){
        const errors = {};
        (!values.correo) ? errors.correo = "El correo es requerido." : 
        (values.correo.length < 5) ? errors.correo = "El correo debe tener minimo cinco caracteres.":
        true;

        (!values.contraseña) ? errors.contraseña = "La contraseña es requerida." : 
        (values.contraseña.length < 3) ? errors.contraseña = "la contraseña debe tener minimo cinco caracteres.":
        true;        
        return errors;
    },  

    async handleSubmit(values, formikBag){
        const cookies = new Cookies();
        const res = await axios.get(`http://localhost:3000/api/usuarioByMail/${values.correo}`);
        
        if(res.data.length > 0){
            if (res.data[0].contraseña === values.contraseña){                    
                cookies.set('nombre', res.data[0].nombre, {path:"/"});
                cookies.set('apellido', res.data[0].apellido, {path:"/"});
                cookies.set('correo', res.data[0].correo, {path:"/"});
                cookies.set('contraseña', res.data[0].contraseña, {path:"/"});
                cookies.set('id', res.data[0]._id, {path:"/"});                                       
                window.location.href = "./inicio";
            } else {
                alert('La contraseña ingresada no es valida');
            }
        } else {
            alert('El usuario ingresado no existe');         
        }
        formikBag.setSubmitting(false);      
    },    
})(Login);