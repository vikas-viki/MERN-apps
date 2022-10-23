import NoteContext from "./NoteContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = [];
    let [notes, setNotes] = useState(initialNotes)

     
    const getNotes = async() =>{
        const response = await fetch(`${host}/api/notes/fetch-all-notes`,{
            method: "GET",
            headers:{
                "content-Type": "application/json", 
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ODJmMmZmMTBlNTQ0Zjk1YmZiOWIxIn0sImlhdCI6MTY2NTY3NTA1NX0.FOKJR7MNJA4rV-hMzzEh8XY5LrFigZIPbGlhBaY5kn0'
            },
        });
        const json = await  response.json();
        setNotes(json)
    }

    
    const addNote = async({title,description,tag}) =>{
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: "POST",
            headers:{
                "content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ODJmMmZmMTBlNTQ0Zjk1YmZiOWIxIn0sImlhdCI6MTY2NTY3NTA1NX0.FOKJR7MNJA4rV-hMzzEh8XY5LrFigZIPbGlhBaY5kn0"
            },
            body: JSON.stringify({title,description,tag})
        });
        
        const json = await  response.json();
        setNotes(notes.concat(json))
    }

    const editNote = async({_id, title, description, tag}) =>{
        console.log({_id, title, description, tag})
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`,{
            method: "PUT",
            headers:{
                "content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ODJmMmZmMTBlNTQ0Zjk1YmZiOWIxIn0sImlhdCI6MTY2NTY3NTA1NX0.FOKJR7MNJA4rV-hMzzEh8XY5LrFigZIPbGlhBaY5kn0"
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();
        const newNotes = [];
        for(let i = 0 ; i < notes.length; i++){
            const element = notes[i];
            if(element._id === _id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
            newNotes.push(element) 
        }
        
            setNotes(newNotes)
        
    }

    const deleteNote = async(id) =>{
        // const newNote = notes.filter((note)=>{return note._id !== id})
        // setNotes(newNote)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: "DELETE",
            headers:{
                "content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ODJmMmZmMTBlNTQ0Zjk1YmZiOWIxIn0sImlhdCI6MTY2NTY3NTA1NX0.FOKJR7MNJA4rV-hMzzEh8XY5LrFigZIPbGlhBaY5kn0"
            },
        });
        const nNotes = notes.filter((el)=>{return el._id !== id})
        setNotes(nNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;