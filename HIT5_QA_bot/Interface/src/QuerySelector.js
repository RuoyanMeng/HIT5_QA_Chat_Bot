import * as React from 'react';
import './App.css';

const QuerySelector = ({ settings, setSettings }) => {

	return (
		<div className="row">
			{Object.keys(settings).map(k => {
				return (
					<button
						className={settings[k] ? 'unpressed':""}
						onClick={() => {
							let newSettings = Object.assign({}, settings);
							newSettings[k] = !settings[k];
							setSettings(newSettings);
							console.log(settings);
						}}
						key={k}
					>
						{k}
					</button>
				);
			})}
		</div>
	);
};

export default QuerySelector;
