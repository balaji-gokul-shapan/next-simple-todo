import { todos } from '../data/todos';
import { NextResponse } from 'next/server';
import { Task } from '../types/tasks';

const base_url = 'http://localhost:3000';

export async function getAllTodos(): Promise<Task[]> {
  const response = await fetch(`${base_url}/api`, { cache: 'no-store' });
  const todos = await response.json();
  return todos;
}
export async function GET() {
  return NextResponse.json(todos);
}

export async function addTodo(todo: Task): Promise<Task[]> {
  const url = `${base_url}/api`;
  const options = {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log('data: ', data);
  const newTodo = {
    id: todos.length + 1,
    text: data.text,
  };
  todos.push(newTodo as Task);
  return NextResponse.json({
    todos,
  });
  // const { data } = req.body;
  // console.log('Received data:', data);
  // res.status(200).json({ message: 'Data posted successfully' });
}
