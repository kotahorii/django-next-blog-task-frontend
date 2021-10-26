import React, { FormEvent, VFC } from "react";
import { useRecoilState } from "recoil";
import { KeyedMutator } from "swr";
import Cookie from "universal-cookie";
import { selectedTaskState } from "../recoil/recoilTask";
import { ReadTask } from "../types";

const cookie = new Cookie();
type Props = {
  taskCreated: KeyedMutator<ReadTask[]>;
};
const TaskForm: VFC<Props> = ({ taskCreated }) => {
  const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/Json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };
  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          type="text"
          className="text-black mb-8 px-2 py-1"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
