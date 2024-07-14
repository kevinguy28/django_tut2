import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id } = useParams();

    let [note, setNote] = useState(null)
    let [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getCsrfToken()
        getNote()
    }, [id])

    let getCsrfToken = async () => {
        let response = await fetch('/api/csrf/', {
            credentials: 'include',
        });
        let data = await response.json();
        setCsrfToken(data.csrfToken);
    };

    let getNote = async () => {
        if ( id === 'new') return
        let response = await fetch(`/api/notes/${id}`, {
            credentials: 'include'
        })
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            'headers':{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            'headers':{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/delete/`, {
            method: 'DELETE',
            'headers':{
                'Content-Type':'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = () =>{
        if((id !== 'new') && !note.body ){
            console.log("a")
            deleteNote()
        }else if(id !== 'new'){
            console.log("b")
            updateNote()
        }else if(id === 'new' && note.body !== ""){
            console.log(note)
            createNote()
        }
        navigate('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => {setNote({...note,'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage
