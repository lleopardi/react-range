import './Range.css';

import { useState } from 'react';
import * as React from 'react';

import {
    getBoundaries,
    getFilterValue,
    getMaxAndMinValues,
    getPositionFromLabel,
    getTranslate,
    offset,
} from '../../utils/utils';
import Bullet from '../Bullet/Bullet';
import LabelRange from '../Label/LabelRange';
import Line from '../Line/Line';

interface filterNormal {
    min: number;
    max: number;
}

interface RangeProps {
    filter: any;
    label: string;
    onFilter: (filter: filterNormal) => void;
};

const Range = ({ filter, label, onFilter }: RangeProps) => {
    const [wasInit, setWasInit] = useState(false);
    const [currentFilter, setCurrentFilter] = useState({ min: 0, max: 0 });
    const [realBoundary, setRealBoundary] = useState({ min: 0, max: 0, width: 0 });
    const [newCurrentPosition, setNewCurrentPosition] = useState({ min: 0, max: 0 });
    const [newFilterValue, setNewFilterValue] = useState({ min: 0, max: 0 });

    const getNewInitialParams = (el: HTMLElement) => {
        if (el && !wasInit) {
            setWasInit(true);
            const boundary = getBoundaries(el);
            const minAndMaxValues = getMaxAndMinValues(filter);
            setCurrentFilter(minAndMaxValues);
            setRealBoundary({ ...boundary })
            setNewCurrentPosition({ min: -offset, max: (boundary.width - offset) });
        }
    }

    const onNewDrag = (event: React.DragEvent<HTMLDivElement>) => {
        const { clientX } = event;
        const { id } = event.target as HTMLElement;
        let position = null;
        let filterValue = null;
        let current = null;

        const translate = Math.round(getTranslate(clientX, realBoundary.min));
        if (translate < - offset || translate > realBoundary.width - offset) return


        const value = getFilterValue(filter, realBoundary.width, translate);

        if (id === 'min') {
            if (value >= currentFilter.max) return
            position = { ...newCurrentPosition, min: translate };
            filterValue = { ...newFilterValue, min: value };
            current = { ...currentFilter, min: value };
        } else {
            if (value <= currentFilter.min) return
            position = { ...newCurrentPosition, max: translate };
            filterValue = { ...newFilterValue, max: value };
            current = { ...currentFilter, max: value };
        }
        setNewCurrentPosition(position);
        setNewFilterValue(filterValue);
        setCurrentFilter(current);
        event.preventDefault();
    }

    const onNewChangeLabel = (typeBullet: 'min' | 'max') => {
        const bullet = typeBullet;
        return (newValue: number) => {
            let isInvalid = false;
            let position = null;
            let filterValue = null;
            let current = null;
            const translate = getPositionFromLabel(filter, realBoundary.width, newValue);

            if (bullet === "min") {
                if (newValue === currentFilter.min) return isInvalid;
                if (newValue < filter.min || newValue >= currentFilter.max) {
                    isInvalid = true;
                    return isInvalid;
                }
                position = { ...newCurrentPosition, min: translate };
                filterValue = { ...newFilterValue, min: +newValue };
                current = { ...currentFilter, min: +newValue };
            } else {
                if (newValue === currentFilter.max) return isInvalid;

                if (newValue > filter.max || newValue <= currentFilter.min) {
                    isInvalid = true;
                    return isInvalid;
                }
                position = { ...newCurrentPosition, max: translate };
                filterValue = { ...newFilterValue, max: +newValue };
                current = { ...currentFilter, max: +newValue };
            }

            setNewCurrentPosition(position);
            setNewFilterValue(filterValue);
            setCurrentFilter(current);
            onFilter(current);
            return isInvalid;
        };
    };

    const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        onFilter(currentFilter);
        event.preventDefault();
    };

    const isEditable = () => !Array.isArray(filter);

    return (
        <div className="range">
            <LabelRange
                value={currentFilter.min}
                unit={label}
                isEditable={isEditable()}
                onUpdateLabel={onNewChangeLabel("min")}
                alignContentEditable="right"
            />

            <Line setup={getNewInitialParams}>
                
                <Bullet
                    id={"min"}
                    onDrag={onNewDrag}
                    onDragEnd={onDragEnd}
                    position={newCurrentPosition.min}
                />
                <Bullet
                    id={"max"}
                    onDrag={onNewDrag}
                    onDragEnd={onDragEnd}
                    position={newCurrentPosition.max}
                />
            </Line>
            <LabelRange
                value={currentFilter.max}
                unit={label}
                isEditable={isEditable()}
                onUpdateLabel={onNewChangeLabel("max")}
                alignContentEditable="left"
            />
        </div>
    );
};

export default Range;
