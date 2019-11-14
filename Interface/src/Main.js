import React from 'react';
import './App.css';
import QuerySelector from './QuerySelector';
import * as elasticsearch from 'elasticsearch';
import QA from "./QA";

const client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace',
});

const body = (string, fieldMask) => {
	let fields = [];
	if (fieldMask.title) {
		fields.push('title');
	}
	if (fieldMask.detail) {
		fields.push('question_detail');
	}
	if (fieldMask.reply) {
		fields.push('answer.text');
	}

	let body = {
		query: {
			multi_match: {
				query: string,
				fields: fields,
				operator: "or"
			},

			
		},

	
	};

	return body;
};

const Main= ({toggleSidebar})=> {

	
	const [question, setQuestion] = React.useState('Can dogs look up?');
	const [answer, setAnswer] = React.useState('Yes but they have to sit down');
	const [isLoading, setIsLoading] = React.useState(false);

	const [settings, setSettings] = React.useState({ title: false, detail: false, reply: false });

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			console.log('enter pressed');
			setIsLoading(true);
			fetchAnswer(question).then(a => {
				setAnswer(a);
				setIsLoading(false);
			});
		}
	};

	const fetchAnswer = async question => {
		const res = await client.search({
			index: 'test',
			body: body(question, settings),
		});

		let ans;

		try {
			ans = res.hits.hits[0]._source.answer.text;
		} catch (error) {
			ans = "I don't know";
		}
		return ans;
	};

	return (
		<div className="App" onKeyPress={handleKeyPress}>
			<h1>ELI5 QA</h1>
			<button onClick={toggleSidebar}>toggle sidebar</button>
			<QuerySelector settings={settings} setSettings={setSettings} />
			<QA setQuestion={setQuestion} answer={answer.length>900?answer+"...":answer} isLoading={isLoading}></QA>
		</div>
	);
}

export default Main;
