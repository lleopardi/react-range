import { render, screen, fireEvent, getByText, cleanup } from '@testing-library/react';
import * as React from 'react';
import LabelRange from './LabelRange';
import userEvent from '@testing-library/user-event'

describe('when load the component', () => {
    test('should render the component', () => {
        render(<LabelRange
            value={10}
            isEditable={false}
            alignContentEditable="left"
            onUpdateLabel={jest.fn}
            unit={'$'}
        />)
    });
});

describe('when the component is not editable', () => {
    test('should render the component', () => {
        const { getByText, queryByRole } = render(<LabelRange
            value={10}
            isEditable={false}
            alignContentEditable="left"
            onUpdateLabel={jest.fn}
            unit={'€'}
        />)
        expect(getByText(/10 €/)).toBeDefined();
        expect(queryByRole('form')).toBeFalsy();
    });
});

describe('when the component is editable', () => {
    afterEach(()=> {
        cleanup();
    });

    test('should render the component', () => {
        const { getByText, queryByRole } = render(<LabelRange
            value={10}
            isEditable={true}
            alignContentEditable="left"
            onUpdateLabel={jest.fn}
            unit={'€'}
        />)
        expect(getByText(/10 €/)).toBeDefined();
        expect(queryByRole('form')).toBeFalsy();
    });

    test('should render the form', () => {
        const { getByTestId, queryByText } = render(<LabelRange
            value={10}
            isEditable={true}
            alignContentEditable="left"
            onUpdateLabel={jest.fn}
            unit={'€'}
        />)

        userEvent.click(getByTestId('label-range'));

        expect(queryByText(/10 €/)).toBeFalsy();
        expect(getByTestId('input-range')).toBeDefined();
    });

    test('should update the value of label with blur event', () => {
        const onUpdateLabel = jest.fn().mockReturnValue(false);
        const { getByTestId } = render(<LabelRange
            value={10}
            isEditable={true}
            alignContentEditable="left"
            onUpdateLabel={onUpdateLabel}
            unit={'€'}
        />)
        
        userEvent.click(getByTestId('label-range'));
        const input = screen.getByTestId('input-range');
        fireEvent.change(input, {target: {value: '50'}, bubble: true})
        fireEvent.blur(input);
        expect(onUpdateLabel).toHaveBeenCalledWith('50');
    });

    test('should update the value of label with submit event', () => {
        const onUpdateLabel = jest.fn().mockReturnValue(false);
        const { getByTestId } = render(<LabelRange
            value={10}
            isEditable={true}
            alignContentEditable="left"
            onUpdateLabel={onUpdateLabel}
            unit={'€'}
        />)
        
        userEvent.click(getByTestId('label-range'));
        const input = screen.getByTestId('input-range');
        fireEvent.change(input, {target: {value: '50'}, bubble: true})
        fireEvent.submit(input);
        expect(onUpdateLabel).toHaveBeenCalledWith('50');
    });

    test('should mark the value as invalid', () => {
        const onUpdateLabel = jest.fn().mockReturnValue(true);
        const { getByTestId } = render(<LabelRange
            value={10}
            isEditable={true}
            alignContentEditable="left"
            onUpdateLabel={onUpdateLabel}
            unit={'€'}
        />)
        
        userEvent.click(getByTestId('label-range'));
        const input = screen.getByTestId('input-range');
        fireEvent.change(input, {target: {value: '50'}, bubble: true})
        fireEvent.blur(input);
        expect(onUpdateLabel).toHaveBeenCalledWith('50');
        expect(input.getAttribute('class')).toBe('error');
    });
});

