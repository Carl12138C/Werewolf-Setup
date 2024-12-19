import { useRef, useState } from "react";
import "./App.css";

const defaultList: String[] = [
  "Werewolf",
  "Werewolf",
  "Werewolf",
  "Seer",
  "Witch",
  "Hunter",
  "Villager",
  "Villager",
  "Villager",
];
const LIST_KEY = "RoleList";

function setDefaultStorage() {
  localStorage.setItem(LIST_KEY, defaultList.toString());
  return defaultList;
}

function updateList(newList: String[]) {
  localStorage.setItem(LIST_KEY, newList.toString());
}

function App() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const localStorageList =
    localStorage.getItem(LIST_KEY)?.split(",") || setDefaultStorage();
  console.log(localStorageList);
  const [currentList, setList] = useState<String[]>(localStorageList);
  const [role, setRole] = useState<String | undefined>("");
  const [hidden, setHidden] = useState<Boolean>(true);
  // let role='';
  return (
    <>
      {/*Display Modal*/}
      <dialog ref={dialogRef} onClick={() => dialogRef.current?.close()}>
        <img
          className="icons"
          src={role == undefined ? "" : `${role}.png`}
        ></img>
        <h2>{role == undefined ? "No Roles Left" : `You are the ${role}`}</h2>
      </dialog>
      {/* Edit Modal */}
      <dialog ref={editDialogRef}>
        <button
          id="close-button"
          onClick={() => {
            editDialogRef.current?.close();
          }}
        >
          Close
        </button>
        <div id="rows">
          <input
            type="string"
            ref={inputRef}
            placeholder="Enter Role..."
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => {
              let tempList: String[] = [...currentList];
              let newRole: String = inputRef.current!.value;
              if (newRole == "") {
                return alert("Empty role");
              }
              console.log(newRole);
              tempList.push(newRole);
              setList(tempList);
              updateList(tempList);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        {currentList.map(function (roles, index) {
          return (
            <div id="rows" key={index}>
              <ul>{roles}</ul>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={() => {
                  let tempList = [...currentList];
                  tempList.splice(index, 1);
                  setList(tempList);
                  updateList(tempList);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          );
        })}
      </dialog>
      {/* Header */}
      <div id="header">
        <h1>Werewolf Setup</h1>
      </div>

      <div id="display">
        <div id="button-div">
          {hidden && (
            <button
              onClick={() => {
                editDialogRef.current?.showModal();
              }}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => {
              setHidden(!hidden);
            }}
          >
            {hidden ? "Hide" : "Show"}
          </button>
          {hidden && (
            <button
              onClick={() => {
                setList(localStorageList);
                alert("Reset completed.");
              }}
            >
              Reset
            </button>
          )}
        </div>

        <div id="img-div">
          <img src="Werewolf.jpg"></img>
        </div>
        <button
          id="role-button"
          onClick={() => {
            dialogRef.current?.showModal();
            let tempList: String[] = [...currentList];
            let random = Math.floor(Math.random() * tempList.length);
            setRole(tempList[random]);
            tempList.splice(random, 1);
            setList(tempList);
          }}
        >
          Get Role
        </button>
        <h2>{`${currentList.length} roles left`}</h2>
      </div>
    </>
  );
}

export default App;
