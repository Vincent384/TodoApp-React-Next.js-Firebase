'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDoc, collection, onSnapshot, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import db from './firebase-config.js';
import { Pen, Trash2 } from 'lucide-react';

const Page = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({ todo: '' });
  const [editTodo, setEditTodo] = useState({ id: null, text: '' }); // State to store the todo item being edited

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.todo !== '') {
      await addDoc(collection(db, 'todo'), {
        todo: newTodo.todo
      });
    }
    setNewTodo({ todo: '' });
  };

  const handleDelete = async (id) => {
    const todoRef = doc(db, 'todo', id);
    await deleteDoc(todoRef);
  };

  const handleUpdate = async () => {
    const todoRef = doc(db, 'todo', editTodo.id);
    await updateDoc(todoRef, { todo: editTodo.text }); 
    setEditTodo({ id: null, text: '' }); 
  };

  useEffect(() => {
    const q = query(collection(db, 'todo'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todos = [];
      snapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      setTodoList(todos);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-slate-500'>
      <div className="flex flex-col w-full max-w-sm items-center space-y-2">
        <div className="flex w-full items-center space-x-2">
          <Input value={newTodo.todo} onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })} type="email" placeholder="Write a Todo" />
          <Button onClick={(e) => addTodo(e)} type="submit">Add Todo</Button>
        </div>
        <div className='flex flex-col col-span-1 justify-center items-center'>
          <ul className=''>
            {todoList.map((item) => (
              <li className='bg-slate-200 m-2 w-[400px] flex h-10 px-4 py-2 justify-between border-2 rounded-md' key={item.id}>
                {editTodo.id === item.id ? (
                  <Input value={editTodo.text} onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })} />
                ) : (
                  <span>{item.todo}</span>
                )}
                <div className='flex gap-2'>
                  {editTodo.id === item.id ? (
                    <Button onClick={handleUpdate}>Save</Button>
                  ) : (
                    <span onClick={() => setEditTodo({ id: item.id, text: item.todo })}><Pen className='cursor-pointer' /></span>
                  )}
                  <span onClick={() => handleDelete(item.id)} className='flex items-center text-red-500 cursor-pointer'><Trash2 /></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
