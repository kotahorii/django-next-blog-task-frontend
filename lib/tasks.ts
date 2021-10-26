import { ReadTask } from "../types";

export const getAllTasksData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = (await res.json()) as ReadTask[];
  const staticFilteredTasks = tasks.sort((a, b) =>
    new Date(b.created_at) < new Date(a.created_at) ? 1 : -1
  );
  return staticFilteredTasks;
};

export const getAllTasksIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = (await res.json()) as ReadTask[];

  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
};
export const getTaskData = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`
  );
  const task = (await res.json()) as ReadTask;

  return task;
};
