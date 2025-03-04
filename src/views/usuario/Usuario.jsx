// Usuario.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsuarios, eliminarUsuario } from '../../redux/usuariosSlice';
import styles from './Usuario.module.css';
import Modal from "../../components/modal/Modal";
import FormModalEdit from "../../components/formEdit/FormEdit";

const Usuario = () => {
    const dispatch = useDispatch();
    const usuarioState = useSelector((state) => state.usuarios);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchUsuarios()); // Despacha la acción para obtener los usuarios
    }, [dispatch]);

    useEffect(() => {
        if (usuarioState.usuarios && usuarioState.usuarios.length > 0) {
            console.log("Usuarios cargados: ", usuarioState.usuarios);
        }
    }, [usuarioState.usuarios]);
    // Funciones para el Modal Editar
    // Función para abrir el modal y establecer el usuario seleccionado
    const showModalEdit = (usuario) => {
        setSelectedUserEdit(usuario);
        setIsModalOpenEdit(true);
    };

     // Función para cerrar el modal
     const closeModalEdit = () => {
        setIsModalOpenEdit(false);
        setSelectedUserEdit(null); // Opcional: Limpiar el usuario seleccionado al cerrar el modal
    };

    //---------------------modalDelete--------------------------------------------
    // Función para abrir el modal y establecer el usuario seleccionado
    const showModal = (usuario) => {
        setSelectedUser(usuario);
        setIsModalOpen(true);
    };

     // Función para cerrar el modal
     const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null); // Opcional: Limpiar el usuario seleccionado al cerrar el modal
    };
    //--------------------------------------------------------------------------------

   // Función para confirmar la eliminación del usuario
   const confirmDelete = (id) => {
    dispatch(eliminarUsuario(id));
    closeModal();
    };

    return (
        <div className={styles.tableContainer}>
            <h1 className={styles.tableTitle}>Usuarios</h1>
            

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Rol</th>
                        <th className={styles.th}>Nombre</th>
                        <th className={styles.th}>Apellido</th>
                        <th className={styles.th}>Edad</th>
                        <th className={styles.th}>Correo</th>
                        <th className={styles.th}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarioState.usuarios.map((usuario) => (
                        <tr key={usuario.id} className={styles.tbodyTr}>
                            <td className={styles.td}>{usuario.id}</td>
                            <td className={styles.td}>{usuario.rol}</td>
                            <td className={styles.td}>{usuario.nombre}</td>
                            <td className={styles.td}>{usuario.apellido}</td>
                            <td className={styles.td}>{usuario.edad}</td>
                            <td className={styles.td}>{usuario.email}</td>
                            <td className={styles.td}>
                                <div className={styles.buttonContainer}>
                                    <button onClick={() => showModal(usuario)} className={styles.deleteButton}>Eliminar</button>
                                    <button onClick={() => showModalEdit(usuario)} className={styles.editButton}>Editar</button>
                                </div>
                            </td>
                            {/* Añadir más datos de usuario según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Aquí usamos el estado isModalOpen para controlar si el modal debe mostrarse */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} user={selectedUser} confirmDelete={confirmDelete} entidad='usuario' accion='eliminacion'/>
            <FormModalEdit isOpen={isModalOpenEdit} onRequestClose={closeModalEdit} user={selectedUserEdit} entidad='Usuario'/>

        </div>
    );
}

export default Usuario;



