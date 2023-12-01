import { Task } from '@/app/types/tasks';
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import React from 'react';
import { Tasks } from '../task/page';

interface TodoProps {
  tasks: Task[];
}
export const TodoList: React.FC<TodoProps> = ({ tasks }) => {
  console.log('tasks: ', tasks);
  return (
    <>
      <TableContainer className="my-5 bg-slate-500 mx-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="Cells font-bold">Name</TableCell>
              <TableCell className="Cells font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <Tasks key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
