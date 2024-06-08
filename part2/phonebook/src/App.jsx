import { useState, useEffect } from "react";
import backend from "./backend";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={message[0] === "I" ? "error" : "message"}>{message}</div>
  );
};

const Names = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
      <td>
        <button onClick={() => props.deletePerson(props.id)}>del</button>
      </td>
    </tr>
  );
};

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.persons
          .filter((person) => checkContain(person.name, props.filter))
          .map((person) => (
            <Names
              key={person.name}
              id={person.id}
              deletePerson={props.deletePerson}
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook do you want to change the number?`
        )
      ) {
        const p = persons.find((e) => e.name === newName);
        const newp = { ...p, number: newNumber };
        const updatedPersons = persons.map((person) =>
          person.id === newp.id ? newp : person
        );
        backend
          .update(p.id, newp)
          .then(() => {
            setPersons(updatedPersons);
            setMessage(`Update number of ${newName}`);
            setTimeout(() => setMessage(null), 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => setMessage(null), 5000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }
    const person = { name: newName, number: newNumber };
    backend.create(person).then((person) => {
      setPersons(persons.concat(person));
      setMessage(`Added ${newName}`);
      setTimeout(() => setMessage(null), 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      backend.delItem(id);
      setPersons(persons.filter((person) => person.id !== id));
    } else return;
  };

  const filterName = (e) => setNewFilter(e.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        deletePerson={deletePerson}
        persons={persons}
        filter={newFilter}
      />
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
