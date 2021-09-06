import * as React from 'react';
import { useState } from 'react';
import './Bullet.css';

enum CursorStyle {
    grabbing='grabbing',
    grab='grab'
}
interface BulletProps {
    onDrag: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void,
    position: number,
    id: 'min' | 'max'
}

const Bullet = ({ onDrag, onDragEnd, position, id }: BulletProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [cursorStyle, setCursorStyle] = useState('');

    const handlerOnMouseDown = (event: React.DragEvent<HTMLDivElement>) => {
        setIsPressed(true);
        setCursorStyle(CursorStyle.grabbing);
        event.preventDefault();
    }

    const handlerOnMouseMove = (event: React.DragEvent<HTMLDivElement>) => {
        if(isPressed){
            setCursorStyle(CursorStyle.grabbing);
            onDrag(event);
        }
        event.preventDefault();
    }

    const handlerOnMouseUp = (event: React.DragEvent<HTMLDivElement>) => {
        onDragEnd(event);
        setIsPressed(false);
        setCursorStyle(CursorStyle.grab);
        event.preventDefault();
    }

    const handlerOnMouseEnter = (event: React.DragEvent<HTMLDivElement>) => {
        setCursorStyle(CursorStyle.grab);
        setIsPressed(false);
        event.preventDefault();
    }

    const handlerOnMouseLeave = (event: React.DragEvent<HTMLDivElement>) => {
        setCursorStyle('');
        event.preventDefault();
    }

    return (
        <div
            id={id}
            className={`bullet ${cursorStyle}`}
            data-testid="bullet"
            onMouseDown={handlerOnMouseDown}
            onMouseMove={handlerOnMouseMove}
            onMouseUp={handlerOnMouseUp}
            onMouseEnter={handlerOnMouseEnter}
            onMouseLeave={handlerOnMouseLeave}
            style={{
                left: `${position}px`
            }}>
        </div>
    );
}

export default Bullet;
