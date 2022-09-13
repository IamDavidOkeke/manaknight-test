import React from 'react';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './constant';

const DropBox = ({remove})=>{


    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ROW,
        drop:(item,monitor)=>{
            remove()
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
          }),
    });

    return (
        <div ref = {drop} style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            }}>

        </div>
    )
}

export default DropBox