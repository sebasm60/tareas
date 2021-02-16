import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Listar from './listar'
import Agregar from './agregar';



class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {            
        }
    };
    
    exit = () => {
        const cookies = new Cookies();
        cookies.remove('nombre', {path:"/"});
        cookies.remove('apellido', {path:"/"});
        cookies.remove('correo', {path:"/"});
        cookies.remove('contraseña', {path:"/"});
        cookies.remove('id', {path:"/"});
        window.location.href = "./"
    };   

    render(){
        return (
            <div>
                <nav className="darken-1">
                    <div className="container">
                        <a className="brand-logo" href="/inicio">Gestor de tareas</a>
                    </div>
                    <button className="btn ligth red" onClick={this.exit}>exit</button>
                </nav>
    
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <Agregar/>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <Listar/>                                       
                        </div>
                    </div>
                </div>
            </div>
        );    

    };
};

export default Menu;
