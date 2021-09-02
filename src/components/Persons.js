import React from 'react'

const Persons = ({filteredName, onDelete}) => {
    return (
        <div>
        {filteredName.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick = {()=> onDelete(person)}>Delete</button>
        </p>
        
      ))}
        </div>
    )
}

export default Persons
