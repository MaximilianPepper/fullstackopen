import { useState } from "react";

const Names = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const nameInput = (e) => {
    setNewName(e.target.value);
  };
  const numberInput = (e) => {
    setNewNumber(e.target.value);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (!checkUnique(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const person = { name: newName, number: newNumber };
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name: <input onChange={nameInput} value={newName} />
        </div>
        <div>
          number: <input onChange={numberInput} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        {persons.map((person) => (
          <Names key={person.name} name={person.name} number={person.number} />
        ))}
      </table>
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
