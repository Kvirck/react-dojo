import React from 'react'
import { Avatar } from '../../components/Avatar/Avatar'
import './Project.css'

export const ProjectSummary = ({ project }) => {
    return (
        <div className='project-summary'>
            <h2 className='page-title'>{project.name}</h2>
            <p className='due-date'>
                Project due by {project.dueDate.toDate().toDateString()}
            </p>
            <p className='details'>
                {project.details}
            </p>
            <h4>Project assigned to:</h4>
            <div className='assigned-users'>
                {project.members.map(user => (
                    <div key={user.id}>
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
            </div>
        </div>
    )
}
