import React from 'react'

const PersonForm = ({onSubmit, onNameChange, onNumberChange, newName, number}) => {
    return (
        <div>
            <form onSubmit = {onSubmit}>
        <div>
          name: <input onChange = {onNameChange} value= {newName} />
          number: <input onChange= {onNumberChange} value = {number}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}

export default PersonForm
