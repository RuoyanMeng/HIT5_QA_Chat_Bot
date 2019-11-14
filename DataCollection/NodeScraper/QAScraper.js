var fetch = require('node-fetch');

const submissionUrl = (subreddit,afterTime, beforeTime, size) => {
	return `https://api.pushshift.io/reddit/search/submission/?size=${size}&subreddit=${subreddit}&before=${beforeTime}&after=${afterTime}&num_comments>=5&sort_type=score&sort=desc&user_removed=false&mod_removed=false`;
};

const commentUrl = subId => {
	return `https://api.pushshift.io/reddit/comment/search?size=100&link_id=${subId}&sort_type=score&sort=desc&user_removed=false&mod_removed=false`;
};

var fs = require('fs');

const startTime = 1320969600;
const endTime = 1556039583;

let spanStart = startTime;
const secondsInAShift = 60 * 60 * 24;

const batchSize = 100;

const sub="AskHistorians";

var stream = fs.createWriteStream('QA'+sub+'.json', { flags: 'a' });

setInterval(() => {
	if (spanStart > endTime) {
		throw new Error();
	}
	spanStart += secondsInAShift;
	console.log(spanStart);
	fetch(submissionUrl(sub,spanStart, spanStart + secondsInAShift, batchSize))
		.then(res => res.json())
		.then(body => {
			body.data.slice(0, 100).forEach(post => {
				if (post.self_text == '[deleted]' || post.self_text == '[deleted]') {
					return 0;
				}
				fetch(commentUrl(post.id))
					.then(res2 => res2.json())
					.then(body2 => {
						if (body2.data.length > 0) {
							var comment = body2.data.sort((a,b)=>b.score-a.score).find(c => c.parent_id.substring(0, 2) == 't3');
							if (
								comment &&
								comment.body != '[deleted]' &&
								comment.body != '[removed]' &&
								comment.author != 'AutoModerator'
							) {
								var QA = {
									title: post.title,
									question_detail: post.selftext,
									date: post.created_utc,
									post_score: post.score,
									num_comments: post.num_comments,
									full_link: post.full_link,
									flair: post.flair,
									over_18:post.over_18,
									all_awardings:post.awards,

									answer: {
										text: comment.body,
										author: comment.author,
										date: comment.created_utc,
										score: comment.score,
										perma_link:comment.perma_link,
										awards:comment.awards
									},
								};
								stream.write(JSON.stringify(QA) + ',\n', () => console.log('success!'));
							}
						}
					})
					.catch(e => 'failed to get comment');
			});
		})
		.catch(e => 'failed to get posts');
}, 5000);
