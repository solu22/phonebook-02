import React from 'react'

const Persons = ({filteredName, onDelete}) => {
  if(filteredName.length === 0){
    return <p>Person not found</p>
  }
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
