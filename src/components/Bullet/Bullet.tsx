import * as React from 'react';
import './Bullet.css';


interface BulletProps {
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void,
    onDrag: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void,
    position: number,
    id: 'min' | 'max'
}

const Bullet = ({ onDragStart, onDrag, onDragEnd, position, id }: BulletProps) => {

    const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event);
    }

    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        onDrag(event);
    }

    return (
        <div
            id={id}
            className={`bullet`}
            data-testid="bullet"
            draggable
            onDragStart={dragStart}
            onDrag={drag}
            onDragEnd={onDragEnd}
            style={{
                left: `${position}px`
            }}>
        </div>
    );
}

export default Bullet;
