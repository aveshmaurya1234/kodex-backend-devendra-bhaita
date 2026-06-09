import React from 'react'

const List = ({list, handleDelete}) => {
  return (
    
        <div className='border sm:w-xl w-2xl bg-gray-400 px-5 py-3 rounded-md '>
            <h1 className='font-bold text-2xl'>{list.taskName}</h1>
            <p>{list.description }</p>
            <div className='flex justify-between pt-2'>
                <button className=' cursor-pointer py-1 px-3 rounded bg-green-300'>Update</button>
                <button onClick={() => handleDelete(list._id)} className=' cursor-pointer py-1 px-3 rounded bg-red-500'>Delete</button>
            </div>
        </div>
    
  )
}

export default List
