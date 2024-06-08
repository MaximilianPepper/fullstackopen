import { useState, useEffect } from "react";
import backend from "./backend";

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.persons
          .filter((person) => checkContain(person.name, props.filter))
          .map((person) => (
            <Names
              key={person.name}
              name={person.name}
              number={person.number}
            />
          ))}
      </tbody>
    </table>
  );
};
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input onChange={props.onChange1} value={props.value1} />
      </div>
      <div>
        number: <input onChange={props.onChange2} value={props.value2} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = (props) => {
  return (
    <>
      <div>
        filter shown with{" "}
        <input onChange={props.onChange} value={props.value} />
      </div>
    </>
  );
};

const Names = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const hook = () => {
    backend.getData().then((response) => setPersons(response));
  };

  useEffect(hook, []);
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
    backend.create(person);
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const filterName = (e) => setNewFilter(e.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterName} value={newFilter} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={formSubmit}
        onChange1={nameInput}
        value1={newName}
        onChange2={numberInput}
        value2={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
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
