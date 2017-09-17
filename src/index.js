module.exports =
 function check(str, bracketsConfig) {
  	let string=str.split('');
  	return findClose(string,bracketsConfig);
}

function findClose(array,config){
	for(let i=0;i<array.length;i++){
		let lookFor=findRule(array[i],config);
		let isFound=false;
		let count=1;
		if(!lookFor) return false;

//for cases, when open and close symbols the same: || 11 and etc
		if(lookFor[0]===lookFor[1]){
			let lastInd;
			try{
			lastInd=array.slice(i+1).lastIndexOf(lookFor[0])+1+i;
			}
			catch(err){
				return false;
			}
			isFound=true;
			if(((i+1)<=(lastInd-1))&&!findClose(array.slice(i+1,lastInd),config)) return false;
				break;
		}

//for cases, when open and close symbols differ: {} [] and etc
		for(let k=i+1;k<array.length;k++){
			if(array[k]===lookFor[0]) count++;
			if(array[k]===lookFor[1]) count--;
			if((array[k]===lookFor[1])&&(count===0)){
				i=k;
				isFound=true;
				if((i+1)<=(k-1))findClose(array.slice(i+1,k));
				break;
			}
		}
		if(!isFound) return false;
	}
	return true;
}

function findRule(el,config){
	for(let rule of config){
		if(el===rule[0])
			return rule;
	}
	return false;

}
