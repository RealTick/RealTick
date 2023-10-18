import React from 'react';

const PeriodSelector = ({ selectedPeriod, onSelectPeriod }) => {
    return (
        <div className="periodSelector">
            {['1d', '5d', '1m', '6m', '1y', 'max'].map(period => (
                <button 
                    key={period}
                    className={selectedPeriod === period ? "active" : ""}
                    onClick={() => onSelectPeriod(period)}>
                    {period}
                </button>
            ))}
        </div>
    );
}

export default PeriodSelector;
