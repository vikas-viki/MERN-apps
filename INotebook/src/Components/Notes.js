import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Contexts/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {

    const notesContext = useContext(noteContext)
    const { notes, getNotes, editNote } = notesContext;
    useEffect(() => {
        getNotes()
    }, [])


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote)
    }
    const ref = useRef(null)
    const [note, setNote] = useState({_id:"", title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const handleUpdateNote = (e) => {
        e.preventDefault()
        editNote(note);
        props.showAlert("Note edited succesfully", "success");
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content px-5 pb-5 d-flex">
                        <div className="modal-header d-flex justify-content-center mb-3">
                            <h5 className="modal-title text-center" id='title' >{note.title}</h5>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3"  aria-describedby="descHelp" minLength={5} onChange={onChange} value={note.description}></textarea>
                            {note.description.length < 5 && <div id="descHelp" className="form-text text-warning">Description must atleast 5 characters long.</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" aria-describedby="descHelp" minLength={5} onChange={onChange} value={note.tag} />
                            {note.tag.length < 3 && <div id="descHelp" className="form-text text-warning">tag must atleast 3 characters long.</div>}
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateNote} data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h3>Your notes</h3>
                <div className='container'>
                    {notes.length === 0 && "You don't have any notes to display"}
                </div>
                {notes.map((ele) => {

                    return <Noteitem key={ele._id} updateNote={updateNote} note={ele} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes