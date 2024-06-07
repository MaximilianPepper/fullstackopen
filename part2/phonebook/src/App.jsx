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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
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

  const filterName = (e) => setNewFilter(e.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={filterName} value={newFilter} />
      </div>
      <h2>add a new</h2>

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
        <tbody>
          {persons
            .filter((person) => checkContain(person.name, newFilter))
            .map((person) => (
              <Names
                key={person.name}
                name={person.name}
                number={person.number}
              />
            ))}
        </tbody>
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
function checkContain(name, filter) {
  if (filter === "") return true;
  name = name.toLowerCase();
  filter = filter.toLowerCase();
  return name.includes(filter);
}
export default App;
