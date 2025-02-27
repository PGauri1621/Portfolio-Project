// src/UI/UpComingList.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Checkbox } from 'antd';
import { useFilter } from './ContextManager';
import './UpComingList.css';

const UpComingList = ({ selectedStatus }) => {
    const { updateFilters } = useFilter();

    // Handle the change of selected status filter
    const handleStatusChange = (checkedValues) => {
        updateFilters({ selectedStatus: checkedValues });
    };

    return (
        <Card className="upcoming-list-card">
            <Card.Body>
                <h3>Status Filter</h3>
                <Checkbox.Group
                    options={['Completed', 'Active', 'Scheduled']}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    style={{ display: 'flex', flexDirection: 'column' }}
                />
            </Card.Body>
        </Card>
    );
};

export default UpComingList;
