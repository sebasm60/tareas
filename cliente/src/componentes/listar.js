import React, {Component} from 'react';
import axios from 'axios';
import Editar from './editar';
import Cookies from 'universal-cookie';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

class Listar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tareas : [],
            tarea : [],
            fecha : ''
        };
        
    };

    async componentDidMount(){ 
        const cookie = new Cookies();        
        const res = await axios.get(`http://localhost:3000/api/tareaByUsuario/${cookie.get('id')}`);
        this.setState({tareas : res.data});
    };
    
    async delete(id){
       if(confirm('Are you sure you want to delete')){
        axios.delete(`http://localhost:3000/api/tarea/${id}`)
        .then(data => {
            M.toast({html : 'Tarea eliminada'});
        });
        await sleep(1000);
        location.reload('/inicio');
       }
    };

    update(tarea){
        const cookies = new Cookies();
        cookies.set('nombretarea', tarea.nombre, {path:"/"});
        cookies.set('prioridad', tarea.prioridad, {path:"/"});
        cookies.set('fecha_vencimiento', tarea.fecha_vencimiento, {path:"/"});
        cookies.set('imagen', tarea.imagen, {path:"/"});
        cookies.set('idtarea', tarea._id, {path:"/"});
     };

    render() {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Prioridad</th>
                            <th>Fecha de vencimiento</th>
                            <th>Imagen</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.tareas.map((tarea) =>(
                            <tr className="table" key={tarea._id}>
                                <td>{tarea.nombre}</td>
                                <td>{tarea.prioridad}</td>
                                <td>{tarea.fecha_vencimiento}</td>
                                <td>{tarea.imagen}</td>
                                <td>
                                    <button className="btn modal-trigger"  href="#idModal" onClick={() => this.update(tarea)}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                </td>                               
                                <td>
                                    <button className="btn light-green darken-1" onClick={() => this.delete(tarea._id)}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                </table>

                <div className="modal" id="idModal">
                    <div className="modal-content">
                        <Editar
                            
                        />
                    </div>
                </div>
            </>
        );        
    };
}
export default Listar;