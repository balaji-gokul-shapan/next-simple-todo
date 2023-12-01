
import AddTask from './components/addTask/page'

import { getAllTodos } from './api/route';
import { TodoList } from './components/todoList/page';

export default async function Home() {
  const tasks = await getAllTodos();
  console.log('tasks: ', tasks);
  return (
    <>
    <main className="max-w-5xl mx-auto mt-5">
      <div className="my-5 flex flex-col text-center">
        <div className="text-5xl font-bold">Simple Todo App</div>
        <AddTask/>
      </div>
      <TodoList tasks={tasks}/>
    </main>
    </>
  )
}
