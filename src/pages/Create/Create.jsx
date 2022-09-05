import { useState, useEffect } from 'react'
import Select from 'react-select';
import './Create.css'
import { useCollection } from './../../hooks/useCollection';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './../../hooks/useAuthContext';
import { useFirestore } from './../../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';

export const Create = () => {
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedCategory, setCategory] = useState('')
    const [selectedUsers, setAssignedUsers] = useState('')

    const [users, setUsers] = useState([])
    const { documents } = useCollection('users')

    const { user } = useAuthContext()

    const { addDocument, response } = useFirestore('projects')

    const navigate = useNavigate()
    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => ({ value: { ...user, id: user.id }, label: user.name })))
        }
    }, [documents])

    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
    ]
    const handleSubmit = async (e) => {
        e.preventDefault()
        const projectUsers = selectedUsers.map(u => ({
            displayName: u.value.name,
            photoURL: u.value.photoURL,
            id: u.value.id
        }))

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const project = {
            name,
            details,
            category: selectedCategory.value,
            members: projectUsers,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            createdBy,
            comments: []
        }
        await addDocument(project)
        navigate('/')
    }
    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>

                {!response.isPending && <button className="btn">Add Project</button>}
                {response.isPending && <button disabled className="btn disabled">Loading...</button>}
                {response.error && <p className="error">{response.error}</p>}
            </form>
        </div>
    )
}
