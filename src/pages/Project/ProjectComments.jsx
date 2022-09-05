import React, { useState } from 'react'
import { Avatar } from '../../components'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { Timestamp } from 'firebase/firestore';

export const ProjectComments = ({ project }) => {
    console.log(project);
    const { user } = useAuthContext()
    const { updateDocument, err } = useFirestore('projects')
    const [newComment, setNewComment] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        setNewComment('')
    }
    return (
        <div className='project-comments'>
            <h4>Project Comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-author'>
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className='comment-details'>
                            <p>date here</p>
                        </div>
                        <div className='comment-content'>
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                    <span>Add New comment</span>
                    <textarea onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}></textarea>
                </label>
                <button className='btn'>Add Comment</button>
                {err && <button className='btn'>{err}</button>}
            </form>
        </div>
    )
}
