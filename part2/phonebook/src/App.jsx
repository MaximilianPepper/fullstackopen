import { useState } from "react";

const Names = (props) => {
  return <p>{props.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const nameInput = (e) => {
    setNewName(e.target.value);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (!checkUnique(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name: <input onChange={nameInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Names key={person.name} name={person.name} />
      ))}
    </div>
  );
};
function checkUnique(name, array) {
  for (const person of array) {
    if (person.name === name) return false;
  }
  return true;
}
export default App;
