import Registro from './registro';
import Login from './login';

function Inicio(){
    return (
        <div className="container">
            <div className="row">
                <div className="col l12 s12 m12 block valign-wrapper">
                    <div className="col l12 center">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <button className="btn modal-trigger"  href="#login">
                            Login
                        </button>                        
                    </div>
                </div>
                <div className="col l12 s12 m12 block valign-wrapper">
                    <div className="col l12 center">
                    
                    <br/>
                        <button className="btn modal-trigger"  href="#registro">
                            Resgistro
                        </button>

                        <div className="modal" id="login">
                            <div className="modal-content">
                                <Login/>                
                            </div>
                        </div>

                        <div className="modal" id="registro">                    
                            <Registro/> 
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    );
};

export default Inicio;