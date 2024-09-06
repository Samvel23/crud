import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToArray, deleteUser, deleteUserFromArray, getAllUsers } from "./userlist.slice";
import style from "./userlist.module.css";

export const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.isLoading);
  const [close, setClose] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [salary, setSalary] = useState(0);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUserToArray({ name, surname, salary }))
    setClose(false);
    setName("");
    setSurname("");
    setSalary(0);
  };
  return (
    <>
      <h1>UserList</h1>
      <button onClick={() => setClose(true)}>Add User</button>
      {close && (
        <form className={style.formik} onSubmit={handleSubmit}>
          <button onClick={() => setClose(false)}>Close</button>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <input
            type="number"
            placeholder="salary"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}
      <table className={style.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.salary}</td>
              <td>
                <button onClick={() => dispatch(deleteUser(user.id))}>
                  delete
                </button>
                <button>add salary</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loader && (
        <img src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif" />
      )}
    </>
  );
};

