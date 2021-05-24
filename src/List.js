import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({
  list,
  deleteItemFromList,
  editItemFromList,
  clearAllItems,
}) => {
  return (
    <div className="grocery-container">
      <div className="grocery-list">
        {list.map((item) => {
          const { id, value } = item;
          return id !== 0 ? (
            <article key={id} className="grocery-item">
              <p className="title">{value}</p>
              <div className="btn-container">
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => editItemFromList(id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => deleteItemFromList(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          ) : null;
        })}
      </div>
      <button className="clear-btn" onClick={clearAllItems}>
        clear items
      </button>
    </div>
  );
};

export default List;
