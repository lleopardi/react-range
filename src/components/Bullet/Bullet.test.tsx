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

    test('should add the class grabbing on mouseDown', () => {
        const onDrag = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={jest.fn}
            position={0}
        />);
        fireEvent.mouseDown(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(classes).toContain('grabbing');
    });

    test('should add the class grabbing on mouseMove', () => {
        const onDrag = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={jest.fn}
            position={0}
        />);
        fireEvent.mouseDown(getByTestId("bullet"), { bubbles: true });
        fireEvent.mouseMove(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(classes).toContain('grabbing');
        expect(onDrag).toHaveBeenCalled();
    });

    test('should add the class grab on mouseUp', () => {
        const onDrag = jest.fn();
        const onDragEnd = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            position={0}
        />);
        fireEvent.mouseDown(getByTestId("bullet"), { bubbles: true });
        fireEvent.mouseMove(getByTestId("bullet"), { bubbles: true });
        fireEvent.mouseUp(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(classes).toContain('grab');
        expect(onDragEnd).toHaveBeenCalled();
    });

    test('should add the class grab on mouseEnter', () => {
        const onDrag = jest.fn();
        const onDragEnd = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            position={0}
        />);
        fireEvent.mouseEnter(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(classes).toContain('grab');
    });

    test('should remove the class grab/grabbing on mouseLeave', () => {
        const onDrag = jest.fn();
        const onDragEnd = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            position={0}
        />);
        fireEvent.mouseLeave(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(classes).not.toContain('grab');
        expect(classes).not.toContain('grabbing');
    });

    test('should not call onDrag method if not clicked the bullet', () => {
        const onDrag = jest.fn();
        const onDragEnd = jest.fn();
        const { getByTestId } = render(<Bullet
            id='min'
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            position={0}
        />);
        fireEvent.mouseMove(getByTestId("bullet"), { bubbles: true });
        const classes = document.getElementById('min').className;
        expect(onDrag).toHaveBeenCalledTimes(0);
    });

});
