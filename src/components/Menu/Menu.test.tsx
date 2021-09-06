import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

describe('Menu component', () => {
    test('Should render the menu', () => {
        const history = createMemoryHistory()
        const menuItems = [
            {
                route: '/',
                description: 'Home'
            },
            {
                route: '/exercise1',
                description: 'Normal (Exercise1)'
            },
            {
                route: '/exercise2',
                description: 'Fijo (Exercise2)'
            },
        ]
        render(
            <Router history={history}>
                <Menu items={menuItems} />
            </Router>
        );
    
        expect(screen.getByText(/Home/i)).toBeDefined();
        expect(screen.getByText(/Normal/i)).toBeDefined();
        expect(screen.getByText(/Fijo/i)).toBeDefined();
    });
});

