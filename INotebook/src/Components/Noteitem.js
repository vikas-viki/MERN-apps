import React, { useContext } from 'react';
import noteContext from '../Contexts/notes/NoteContext';
import "../Styles/NoteItem.css"

const Noteitem = (props) => {

    const notesContext = useContext(noteContext)

    const { deleteNote } = notesContext;
    const { note, updateNote } = props;

    // const hideModal = () => {
    //     const remover = document.getElementById("remover");
    //     setTimeout(() => {
    //         remover.click()
    //     }, 1000)
    // }

    return (
        <div className='col-md-3 mb-3  ' >
            <div className="card " >
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title fs-5 text-uppercase text-wrap">{note.title}</h5>
                        <div className='dropdown'>
                            <i className="fa-solid fa-ellipsis dropbtn"></i>
                            <div className='dropdown-content'>
                                <ul>
                                    <li className='menuItems'
                                        data-bs-toggle="modal"
                                        id="deleteBtn"
                                        data-bs-target="#deleteModal"
                                        style={{ padding: " 12px 16px" }}
                                        onClick={() => { 
                                            deleteNote(note._id);
                                            props.showAlert("Note deleted succesfully", "warning");
                                        }}
                                    >Delete
                                    </li>
                                    <li
                                        className='menuItems'
                                        onClick={() => { updateNote(note) }}
                                    >Edit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Noteitem




