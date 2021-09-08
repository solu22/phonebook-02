import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [number, setNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState()
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
 
  const filteredName = persons.filter((person) =>
  person.name.toLowerCase().includes(filter.toLowerCase())
  )
 
  

  const addPerson = (e) => {
    e.preventDefault();
    if(newName === "" || number ===""){
      return window.alert('Either of the field cannot be empty')
    }
    const existingPerson = persons.find(
      (person) =>
        person.name.toLowerCase() === newName.toLowerCase() ||
        person.number === number
    );
    if (existingPerson) {
      if(existingPerson.number === number && existingPerson.name.toLowerCase()=== newName.toLowerCase()){
       window.alert(
        `${newName} : ${number} is already added to phonebook`
      )
      return
      }

      if(existingPerson.name.toLowerCase()=== newName.toLowerCase()){
        if(window.confirm(`${newName} is already added to phonebook, replace old number with new one ? ` ))
        {
         const updatedPerson = {...existingPerson, number:number}
         personService.update(updatedPerson).then(r=>{
           setPersons(persons.map(p => p.id !== updatedPerson.id ? p : r))
         })
         .then(()=>{
           setNewName('')
           setNumber('')
           setNotification(
             `Updated old number for ${newName} with ${number}`
              )
           setMsgType('success')
              setTimeout(() => {
                setNotification(null)
              }, 2000);
         })
        }
        return
      }

      if(existingPerson.number === number){
        if(window.confirm(`${number} is already added to phonebook, replace old number with new one ? ` ))
        {
         const updatedPerson = {...existingPerson, name: newName}
         personService.update(updatedPerson).then(r=>{
           setPersons(persons.map(p => p.id !== updatedPerson.id ? p : r))
         })
         .then(()=>{
           setNewName('')
           setNumber('')
           setNotification(`Updated contact name for ${number} with ${newName}`)
           setMsgType('success')
            })
            
             setTimeout(() => {
               setNotification(null)
             }, 2000)
         }
         return
        }
        
      }
      
    
   else{
    const personObj = {
      name: newName,
      number: number
    }

    personService.create(personObj).then((person) => {
      setPersons(persons.concat(personObj));
      setNewName("")
      setNumber("")
      setNotification(`Added contact ${newName}`)
      setMsgType('success')
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    }).catch(error=>{
      setNotification("length is shorter for fields", error.response.data)
      setMsgType('error')
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    })
  }
}
  

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then((p) => {
          setPersons(persons.filter((leftPerson) => leftPerson.id !== person.id));
        })
        .catch((error) => {
          setNotification(` ${person.name} already removed from server`)
          setMsgType('error')
          setPersons(persons.filter(p => p.id !== person.id))
          setTimeout(() => {
            setNotification(null)
          }, 2000);
          
        });
    }
  };

  
 
  return (
    <>
      <h2>Phonebook</h2>
      <Notification message = {notification} type = {msgType}/>
      <Filter onChange={handleSearch} filter={filter} />
      <h3>Add a New</h3>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumChange}
        newName={newName}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons filteredName={filteredName} onDelete={handleDelete} />
      ...
    </>
  );
};


export default App;
