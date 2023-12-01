'use client';
import { getAllTodos } from '@/app/api/route';
import { deleteTodo, editTodo } from '@/app/api/[todoId]/route';

import { Task } from '@/app/types/tasks';
import { Modal, TableCell, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TaskProps {
  task: Task;
}
export const Tasks: React.FC<TaskProps> = ({ task }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const router = useRouter();

  const handleSubmitEditTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(taskToEdit);
    console.log(task);
    await editTodo(task, {
      text: taskToEdit,
      id: task.id,
    })
    setTaskToEdit('');
    setOpenEditModal(false);
    router.refresh();
  };
  const handleDeleteTask = async (id: number) => {
    const data = await deleteTodo(id);
    console.log('data: ', data);
    setOpenDeleteModal(false);

    router.refresh();
  };
  return (
    <TableRow key={task.id} className="rounded-md bg-slate-300">
      <TableCell className="Cells">{task.text}</TableCell>
      <TableCell className="Cells">
        {
          <span
            onClick={() => setOpenEditModal(true)}
            className="cursor-pointer mr-10 font-extrabold text-xl text-emerald-400 hover:text-yellow-500">
            &#9998;
          </span>
        }
        {
          <span
            onClick={() => setOpenDeleteModal(true)}
            className="cursor-pointer gap-10 font-extrabold text-xl text-indigo-700 hover:text-red-500">
            &#10006;
          </span>
        }
        <Modal open={openEditModal}>
          <div className="modalPopup">
            {
              <span
                className="cursor-pointer absolute top-2 right-2 gap-10 font-extrabold text-xl text-indigo-700 hover:text-red-500"
                onClick={() => setOpenEditModal(false)}>
                &#10006;
              </span>
            }
            <div className="modal-action">
              <h3 className="text-2xl font-bold text-center">Edit Task</h3>

              <form onSubmit={handleSubmitEditTodo}>
                <TextField
                  label="Task Name"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  className="input input-bordered w-full mt-5"
                />
                <button type="submit" className="primary-btn mt-10 w-1/2 ">
                  Save Task
                </button>
              </form>
            </div>
          </div>
        </Modal>
        <Modal open={openDeleteModal}>
          <div className="modalPopupDelete">
            <h3 className="text-lg font-bold text-center">
              Are You Sure Want to Delete the Task.?
            </h3>
            <div className="flex flex-row gap-5">
              <button
                className="primary-btn mt-10 w-8/12 bg-red-600"
                onClick={() => setOpenDeleteModal(false)}>
                No
              </button>
              <button
                className="primary-btn mt-10 w-8/12 bg-green-600"
                onClick={() => handleDeleteTask(task.id)}>
                Yes
              </button>
            </div>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};
