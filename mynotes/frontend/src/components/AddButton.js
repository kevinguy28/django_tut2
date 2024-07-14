import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon} from '../assets/add.svg'

const AddButton = () => {
  return (
    <div>
      <Link className="floating-button" to="/note/new">
        <AddIcon />
      </Link>
    </div>
  )
}

export default AddButton
