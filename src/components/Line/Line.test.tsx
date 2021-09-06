import * as React from 'react';
import { render } from '@testing-library/react';
import Line from './Line';

describe('when load the component', () => {
    test('should render the component', () => {
        const setup = jest.fn();
        const { getByText } = render(
            <Line
                setup={setup}>
                <div>Hello world</div>
                <div>A new div</div>
            </Line>
        )
        expect(getByText(/Hello world/)).toBeDefined();
        expect(setup).toHaveBeenCalledTimes(1);
    });
});

