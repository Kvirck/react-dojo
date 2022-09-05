import React from "react";
import { useCollection } from "../../hooks/useCollection";
import './DashBoard.css'
import { ProjectList } from "../../components/ProjectList/ProjectList";


export const DashBoard = () => {
  const { documents } = useCollection('projects')
  return (
    <div className="dashBoard">
      <h2 className="page-title">DashBoard</h2>
      <div className="content">
        <div className="project">
          {documents && <ProjectList projects={documents} />}
        </div>
      </div>
    </div>
  )
}