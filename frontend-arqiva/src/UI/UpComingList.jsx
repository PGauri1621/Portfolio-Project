// src/UI/UpComingList.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Checkbox } from 'antd';
import { useFilter } from './ContextManager';
import './UpComingList.css';

const UpComingList = ({ contributions }) => {
    const { filters, updateFilters } = useFilter();
    const { selectedStatus } = filters;

    const handleStatusChange = (checkedValues) => {
        updateFilters({ selectedStatus: checkedValues });
    };

    return (
        <Card className="upcoming-list-card">
            <Card.Body>
                <h3>Status Filter</h3>
                <Checkbox.Group
                    options={['completed', 'active', 'scheduled']}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    style={{ display: 'flex', flexDirection: 'column' }}
                />
            </Card.Body>
        </Card>
    );
};

export default UpComingList;