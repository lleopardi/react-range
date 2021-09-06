import * as React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('when load the component', () => {
    test('should render the component', () => {
        const {getByText} = render(<Home />);
        expect(getByText(/Demo de input/)).toBeDefined();
    });
    
});
