import { Provider } from "react-redux";
import { UserList } from "./components/UserList/UserList";
import './App.css'
import { store } from "./store";
export default function App() {
  return (
    <>
      <h1>App</h1>
      <h1>ad</h1>
      <Provider store={store}>
        <UserList />
      </Provider>
    </>
  );
}
