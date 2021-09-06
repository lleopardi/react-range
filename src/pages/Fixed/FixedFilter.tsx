import * as React from 'react';
import { useEffect, useState } from 'react';
import Range from "../../components/Range/Range";
import { getFilter } from '../../utils/service';
import './FixedFilter.css';

const FixedFilter = () => {
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [newFilter, setNewFilter] = useState({ min: 0, max: 0 });

    useEffect(() => {
        setIsLoading(true);
        getFilter('filter?type=fixed').then(data => {
            setFilter(data.filter);
            setNewFilter(data.filter);
            setIsLoading(false);
        });
    }, []);

    const onFilter = (newFilter: {min: number, max: number}) => {
        setNewFilter({ ...newFilter })
    }

    const renderRange = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        } else {
            return <Range filter={filter} label="€" onFilter={onFilter} ></Range>;
        }
    }

    return (
        <div className="container-fixed-range">
            <h1>Range with Fixed limit this one has a array of values</h1>
            <div className="fixed-range">
                {renderRange()}
            </div>

            <div>
                New Filter: {newFilter.min} / {newFilter.max}
            </div>
        </div>
    );
}

export default FixedFilter;