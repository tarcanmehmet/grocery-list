import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  if (localStorage.getItem("list")) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [{ id: 0, value: "" }];
  }
};

function App() {
  const [groceryValue, setGroceryValue] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState({ condition: false, id: 0 });
  const [msg, setMsg] = useState({ danger: false, info: "" });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (groceryValue.trim() !== "") {
      if (isEdit.condition) {
        list[
          list.indexOf(list.filter((item) => item.id === isEdit.id)[0])
        ].value = groceryValue;
        setList([...list]);
        setIsEdit({ condition: false, id: 0 });
        setMsg({ danger: false, info: "Item is edited" });
      } else {
        setList([
          ...list,
          { id: list[list.length - 1].id + 1, value: groceryValue },
        ]);
        setMsg({ danger: false, info: "Item is added" });
      }
    }
    setGroceryValue("");
  };
  const deleteItemFromList = (id) => {
    setList(list.filter((item) => item.id != id));
    setMsg({ danger: true, info: "Item is deleted" });
  };
  const editItemFromList = (id) => {
    setIsEdit({ condition: true, id: id });
    setGroceryValue(list.filter((item) => item.id === id)[0].value);
  };
  const clearAllItems = () => {
    setList([{ id: 0, value: "" }]);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <Alert msg={msg} />
      <form className="grocery-form" onSubmit={handleFormSubmit}>
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="e.g. eggs"
            value={groceryValue}
            onChange={(e) => setGroceryValue(e.target.value)}
          ></input>
          <button className="submit-btn" type="submit">
            {isEdit.condition ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 1 ? (
        <List
          list={list}
          deleteItemFromList={deleteItemFromList}
          editItemFromList={editItemFromList}
          clearAllItems={clearAllItems}
        />
      ) : null}
    </section>
  );
}
export default App;
