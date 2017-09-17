module.exports = function check(str, bracketsConfig) {
  	let string=str.split('');
  	return findClose(string,bracketsConfig);
}

function findClose(ar,config){
	let stack=[];
	for(let i=0;i<ar.length;i++){
		let rule=findRule(ar[i],config);
		if(rule[0]===rule[1]){
			if((stack.length===0)||(stack[stack.length-1]!==rule[0])) stack.push(ar[i]);
			else stack.pop();
		}
		else {
			if(ar[i]===rule[0]) stack.push(ar[i]);
			else if((ar[i]===rule[1])&&(stack[stack.length-1]===rule[0])) stack.pop();
			else if((ar[i]===rule[1])&&(stack[stack.length-1]!==rule[0])) stack.push(ar[i]);
		}
	}
	return stack.length===0?true:false;
}

function findRule(el,config){
	for(let rule of config){
		if((el===rule[0])||(el===rule[1]))
			return rule;
	}
	return false;
}
