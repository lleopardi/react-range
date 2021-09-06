import * as React from "react";
import { render, fireEvent } from '@testing-library/react'

import Bullet from "./Bullet";

describe('When load de component', () => {
    test('should render the component', () => {
        render(<Bullet
            id='min'
            onDrag={jest.fn}
            onDragEnd={jest.fn}
            position={0}
        />);

        const position = document.getElementById('min').style.left;
        expect(position).toBe('0px');
    });
});

describe('When the user interact with the component', () => {
    test('should execute onDrag event', () => {
        const onDrag = jest.fn();
        const {getByTestId} = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={jest.fn}
            position={0}
        />);

        fireEvent.drag(getByTestId("bullet"), {bubbles: true});
        expect(onDrag).toHaveBeenCalled();        
    });

    test('should execute onDragStart event', () => {
        const onDrag = jest.fn();
        const onDragStart = jest.fn();
        const {getByTestId} = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={jest.fn}
            position={0}
        />);

        fireEvent.dragStart(getByTestId("bullet"), {bubbles: true});
        expect(onDragStart).toHaveBeenCalled();        
    });

    test('should execute onDragEnd event', () => {
        const onDrag = jest.fn();
        const onDragStart = jest.fn();
        const onDragEnd = jest.fn();
        const {getByTestId} = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            position={0}
        />);

        fireEvent.dragEnd(getByTestId("bullet"), {bubbles: true});
        expect(onDragEnd).toHaveBeenCalled();        
    });
});
