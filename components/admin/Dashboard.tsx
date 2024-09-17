import React, { useState } from 'react'
import DatePicker from 'react-datepicker';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    
    return (
        <div className='ps-4 my-5'>
            <div className="d-flex justify-content-start align-items-center">
                <div className="mb-3 me-4">
                    <label className="form-label d-block">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control"
                    />
                </div>

                <div className="mb-3 me-4">
                    <label className="form-label d-block">End Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard