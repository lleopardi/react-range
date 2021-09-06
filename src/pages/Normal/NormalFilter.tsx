import * as React from 'react';
import { useEffect, useState } from 'react';

import './NormalFilter.css';
import Range from '../../components/Range/Range';
import { getFilter } from '../../utils/service';


const NormalFilter = () => {
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [newFilter, setNewFilter] = useState({ min: 0, max: 0 });

    useEffect(() => {
        setIsLoading(true);
        getFilter('filter?type=normal').then(data => {
            setFilter(data.filter);
            setIsLoading(false);
        })

    }, []);

    const onFilter = (newFilter: { min: number, max: number }) => {
        setNewFilter({ ...newFilter })

    }

    const renderRange = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="normal-range">
                    <Range filter={filter} label="€" onFilter={onFilter} ></Range>
                    <div>
                        New Filter: {newFilter.min} / {newFilter.max}
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="container-normal-range">
            <h1>Range with normal limit this one has a min and max property</h1>
            {renderRange()}
        </div>
    );
}

export default NormalFilter;
