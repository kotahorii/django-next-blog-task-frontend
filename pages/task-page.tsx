import React, { useEffect, VFC } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import { ReadTask } from "../types";
import Task from "../components/Task";
import useSWR from "swr";
import { RecoilRoot, useRecoilState } from "recoil";
import { selectedTaskState } from "../recoil/recoilTask";
import TaskForm from "../components/TaskForm";

const fetcher = (url: string) =>
  fetch(url).then((res): Promise<ReadTask[]> => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage: VFC<{ staticFilteredTasks: ReadTask[] }> = ({
  staticFilteredTasks,
}) => {
  useEffect(() => {
    mutate();
  }, []);
  const { data: tasks, mutate } = useSWR<ReadTask[]>(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks,
  });
  const filteredTasks = tasks?.sort((a, b) =>
    new Date(b.created_at) < new Date(a.created_at) ? 1 : -1
  );

  return (
    <RecoilRoot>
      <Layout title="Task Page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks?.map((task) => (
            <Task key={task.id} task={task} taskDeleted={mutate} />
          ))}
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </RecoilRoot>
  );
};

export default TaskPage;
export const getStaticProps = async () => {
  const staticFilteredTasks = await getAllTasksData();
  return {
    props: { staticFilteredTasks },
    revalidate: 3,
  };
};
