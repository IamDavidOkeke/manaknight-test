import React from "react";
import { useDrag } from 'react-dnd'
import { ItemTypes } from './constant'

const Table = ({videos})=>{
    
  const [{isDragging}, drag] = useDrag(({
    type: ItemTypes.ROW,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

    return (
      <div>
      <table className="table-auto border-collapse p-16 rounded-2xl">
        <thead>
            <tr>
            <th className=" px-6 py-3">#</th>
            <th className=" px-6 py-3">Title</th>
            <th className=" px-6 py-3"></th>
            <th className=" px-6 py-3">Author</th>
            <th className=" px-6 py-3">Most Liked</th>
            </tr>
        </thead>
        <tbody>
        {videos ? videos.map((video) => { return (
            <tr key={video.id}
            ref={drag}
            style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            }}
            >
            <td className="border  px-6 py-3">{video.id}</td>
            <td className="border  px-6 py-3"><img src={video.photo} alt="photos"/></td>
            <td className="border  px-6 py-3">{video.title}</td>
            <td className="border  px-6 py-3">{video.username}</td>
            <td className="border  px-6 py-3">{video.like}</td>
            </tr>
        )})
        : null}
        </tbody>
      </table>
    </div>


    )
}

export default Table