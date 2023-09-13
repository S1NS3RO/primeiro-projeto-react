import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";
import { useState } from "react";
import "./styles.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const addToClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    setList((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const unDo = (event) => {
    event.stopPropagation();
    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });
  };

  const reDo = (event) => {
    event.stopPropagation();
    if (undid.length === 0) {
      return;
    }
    const lastItem = undid[undid.length - 1];
    setUndid((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });
    setList((prev) => [...prev, lastItem]);
  };

  return (
    <main onClick={addToClick}>
      {list.map((item) => (
        <span
          id="dot"
          style={{
            top: `calc(${item.clientY}px - 5px)`,
            left: `calc(${item.clientX}px - 5px)`,
          }}
        />
      ))}
      <div id="btns">
        <button onClick={unDo} id="undo">
          <IoArrowUndoSharp />
        </button>
        <button onClick={reDo} id="redo">
          <IoArrowRedoSharp />
        </button>
      </div>
    </main>
  );
}

export default App;
