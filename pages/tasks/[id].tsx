import Link from "next/link";
import Layout from "../../components/Layout";

import React, { useEffect, VFC } from "react";
import { ReadTask } from "../../types";
import { getAllTasksIds, getTaskData } from "../../lib/tasks";
import { useRouter } from "next/router";
import useSWR from "swr";

type Props = {
  task: ReadTask;
  id: number;
};
const fetcher = (url: string): Promise<ReadTask> =>
  fetch(url).then((res) => res.json());

const Post: VFC<Props> = ({ task, id }) => {
  const router = useRouter();
  const { data: taskData, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`,
    fetcher,
    {
      fallbackData: task,
    }
  );
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !taskData) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={taskData.title}>
      <span>
        {"ID : "}
        {taskData.id}
      </span>
      <p className="mb-4 text-xl font-bold">{taskData.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <div>
        <Link href="/task-page">
          <div className="flex cursor-pointer mt-8">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Back to task-page</span>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllTasksIds();

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }: { params: ReadTask }) => {
  const task = await getTaskData(params.id);
  return {
    props: {
      id: task.id,
      task,
    },
    revalidate: 3,
  };
};
