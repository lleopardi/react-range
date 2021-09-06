import * as React from 'react';
import './Line.css';

interface LineProps {
    children?: React.ReactNode,
    setup: (event: HTMLDivElement) => any
}

const Line = ({ children, setup }: LineProps) => {
    return (
        <div className={`line`}
            data-testid='line'
            ref={setup}
        >
            {children}
        </div>
    );
}

export default Line;
