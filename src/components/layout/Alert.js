import React from 'react';

const Alert = ({ alert, hideAlert }) => {
	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`} style={{ cursor: 'pointer' }} onClick={hideAlert}>
				<span className="fas fa-info-circle" /> {alert.message}
			</div>
		)
	);
};

export default Alert;
