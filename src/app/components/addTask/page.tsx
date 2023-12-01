'use client';
import { useState } from 'react';
import { Modals } from '../modal/page';
import { TextField } from '@mui/material';
import { todos } from '@/app/data/todos';

import { addTodo } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import UUID from 'uuid-int';
function AddTask() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");
  const router = useRouter();
  const id = 0;

  const generator = UUID(id);
  
  const uuid = generator.uuid();

  const handleSubmitNewTodo = async (e: React.FormEvent) =>{
    e.preventDefault();
    console.log(newTodo);
    const data = await addTodo(
      {
        id: todos.length + 1,
        text: newTodo,
      }
    );
    console.log('data: ', data);
    setNewTodo("");
    setOpenModal(false);
    router.refresh();
  };

  return (
    <div>
      <button className="primary-btn mt-10" onClick={() => setOpenModal(true)}>
        Add Task +
      </button>
      <Modals openModal={openModal} setOpenModal={setOpenModal}>
        <div className="modal-action">
          <h3 className="text-2xl font-bold text-center">Add New Task</h3>

          <form onSubmit={handleSubmitNewTodo}>
            <TextField
              label="Task Name"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input input-bordered w-full mt-5"
            />
            <button type="submit" className="primary-btn mt-10 w-1/2 ">
              Add Task
            </button>
          </form>
        </div>
      </Modals>
    </div>
  );
}

export default AddTask;
