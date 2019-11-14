var fs = require('fs');




var {data} = require('../DataCollection/NodeScraper/QA8.json');

N=data.length;
n=50;

out=[];


for(var i=0;i<n;i++){
    let idx=Math.floor(Math.random()*N);
    var entry=data[idx];
    out.push({id:entry.id,index:idx,answer_text:entry.answer.text});
}

// with open('data.json', 'w') as outfile:
//     json.dump(data, outfile)
fs.writeFile('50answers.json', JSON.stringify(out), 'utf8',()=>console.log("done!"));