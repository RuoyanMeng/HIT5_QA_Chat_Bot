import * as React from 'react';
import { useState } from 'react';
import './App.css';

const Loader = () => {
	const [count, setCount] = useState(0);


	return <p id="answer">{'Loading...'}</p>;
};

export default Loader;
