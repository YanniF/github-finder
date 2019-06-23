import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);
	const { alert, hideAlert } = alertContext;

	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`} style={{ cursor: 'pointer' }} onClick={hideAlert}>
				<span className="fas fa-info-circle" /> {alert.message}
			</div>
		)
	);
};

export default Alert;
