import * as React from 'react';
import Loader from './Loader';

const QA = ({ question, setQuestion, isLoading, answer }) => {
	return (
		<React.Fragment>
			<h2>Question:</h2>
			<input id="question" onChange={e => setQuestion(e.target.value)} autoFocus />
			<h2>Answer:</h2>
			{isLoading ? (
				<Loader />
			) : (
				<p id="answer" autoFocus>
					{answer}
				</p>
			)}
		</React.Fragment>
	);
};

export default QA;
