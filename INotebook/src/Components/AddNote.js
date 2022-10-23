import React, { useContext, useState } from 'react'
import noteContext from '../Contexts/notes/NoteContext';

const AddNote = (props) => {

    const notesContext = useContext(noteContext)
    const { addNote } = notesContext;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddnote = (e) => {
        e.preventDefault()
        if (note.title.length >= 3 && note.description.length >= 5) {
            addNote(note)
            props.showAlert("Note added succesfully", "success");
            setNote({ title: "", description: "", tag: "" })
        }
    }
    return (
        <>
            <h3>Create a note</h3>
            <div className='form-add-note'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="titleHelp" minLength={3} name="title" value={note.title} onChange={onChange} />
                        {note.title.length < 3 && <div id="titleHelp" className="form-text text-warning">Title must atleast 3 characters long</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" aria-describedby="descHelp" value={note.description} minLength={5} onChange={onChange} />
                        {note.description.length < 5 && <div id="descHelp" className="form-text text-warning">Description must atleast 5 characters long.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" aria-describedby="descHelp" value={note.tag} minLength={5} onChange={onChange} />
                        {note.tag.length < 3 && <div id="descHelp" className="form-text text-warning">tag must atleast 3 characters long.</div>}
                    </div>
                    <button type="submit" disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} className="btn btn-primary" onClick={handleAddnote}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote