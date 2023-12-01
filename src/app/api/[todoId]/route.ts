import { NextResponse } from 'next/server';
import { todos } from '@/app/data/todos';
import { Task } from '@/app/types/tasks';

const base_url = 'http://localhost:3000';

export async function editTodo(todo: Task, updateData: Task): Promise<Task[]> {
    const url = `${base_url}/api/${todo.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    };
      try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error('Error editing todo:', error);
    throw error;
  }
  }
// const updateComment = async (id, updatedData) => {
//     const response = await fetch(`/api/comments/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedData)
//     });
//     const data = await response.json();
//     console.log('data: ', data);
//     fetchComments();
//   };

//! 
// export async function editTodo(todo: Task): Promise<Task[]> {
//   const url = `${base_url}/api/${todo.id}`;
//   const options = {
//     method: 'PUT',
//     body: JSON.stringify({
//       id: todo.id,
//       text: todo.text,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log('data: ', data);
//     return data;
//   } catch (error) {
//     console.error('Error editing todo:', error);
//     throw error;
//   }
// }

// export async function PUT(
//   request: Request,
//   { params, body }: { params: { todoId: string }; body: { newText: string } }
// ) {
//   const text = body.newText;
//   const todoId = params.todoId;

//   const updatedTodo = {
//     id: parseInt(todoId),
//     text: text,
//   };
//   console.log('updatedTodo: ', updatedTodo.text);
//   const index = todos.findIndex((todo) => todo.id === parseInt(todoId));
//   if (index !== -1) {
//     todos[index].id = parseInt(todoId);
//     todos[index].text = body.newText;
//   }
//   return NextResponse.json(updatedTodo);
// }
export async function PUT(request: Request, { params }: { params: { todoId: string } }) {
    const slug = params.todoId;
    const updateData = await request.json();
    const updateComment = todos.find((todo) => todo.id === parseInt(slug));
  
    if (updateComment) {
      updateComment.text = updateData.text;
      return NextResponse.json(updateComment);
    } else {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
  }

export async function deleteTodo(id: number): Promise<Task[]> {
  const url = `${base_url}/api/${id}`;
  console.log('url: ', url);
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  const data = await response.json();
  console.log('data: ', data);
  return data;
}
export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const todoId = params.todoId;
  const index = todos.findIndex((todo) => todo.id === parseInt(todoId));
  const deleteTask = todos.find((todo) => todo.id === parseInt(todoId));
  console.log('deleteTask: ', deleteTask);
  todos.splice(index, 1);
  return NextResponse.json(deleteTask);
}
