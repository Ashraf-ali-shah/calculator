let result=document.querySelector(".result")
let buttons=document.querySelectorAll(".button")
let str=""
function back(){
    str=str.slice(0,-1)
    result.innerHTML=str
}
function addRecord(newhis){
    let el=document.createElement("p")
    el.textContent=newhis
    let cont=document.querySelector(".content")
    cont.appendChild(el)
}
function isoperator(char){
    return /^[\+\-\/\*\×]$/.test(char)
}
function isnumber(num){
    return /^[0-9]$/.test(num)
}
function getresult(){
    try{
        if(/[+\-×/]/.test(str)){
        let newstr=str+"="
        str=str.replaceAll('×','*')
        const expr = new Function(`return ${str};`)()
        newstr+=expr
        addRecord(newstr)
        str=''
        if (expr!="Infinity"){
            str+=expr
        }
        result.innerHTML=expr
        }
    }
    catch(err){
        result.innerHTML="error"
        str=''
    }
}
function clearhistory(){
    let cont=document.querySelector(".content")
    cont.innerHTML=""
    // while(cont.children.length>0){
    //     cont.removeChild(cont.children[0])
    // }
}
function openhistory(){
    let his=document.querySelector(".history-wraper")
    his.classList.toggle("hide")
}
function closehistory(){
    let his=document.querySelector(".history-wraper")
    his.classList.toggle("hide")
}
for (let i=0;i<buttons.length-1;i++){
    buttons[i].addEventListener('click',function(){
        if (this.innerText=='AC'){
            str=''
        }
        else if (this.innerText==')'){
            if(str.length==0){
                return 
            }
            str+=')'
        }
        else if (this.innerText=='/'){
            if (str.length==0){
                return
            }
            if (isoperator(str[str.length-1])){
                str=str.slice(0,-1)
                str+="/"
            }
            else{
                str+='/'
            }
        }
        else if (this.innerText=='×'){
            if (str.length==0){
                return 
            }
            if (isoperator(str[str.length-1])){
                str=str.slice(0,-1)
                str+='×'  
            }
            else{
                str+='×'
            }
        }
        else if (this.innerText=='+'){
            if (isoperator(str[str.length-1])){
                str=str.slice(0,-1)
                str+='+'    
            }
            else{
                str+='+'
            }
        }
        else if (this.innerText=='-'){
            if (isoperator(str[str.length-1])){
                str=str.slice(0,-1)
                str+='-'   
            }
            else{
                str+='-'
            }
        }
        else if (this.innerText=='.'){
            let i=str.length-1
            while (i>=0 && !isoperator(str[i])){
                if (str[i]==='.'){
                    return 
                }
                i-=1
            }
            str+='.'
        }
        else if (this.innerText=='00'){
            if (str.length==0 ||  (str[0]=='0' && str[1]!='.')){
                return 
            }
            else{
                str+='00'
            }
        }
        else if (this.innerText=='0'){
            if (str[0]!='0' || str[1]=='.'){
                str+='0'
            }
        }
        else if(isnumber(this.innerText)){
            if ((str.length==1 && str[0]==='0')||(str[str.length-1]==='0' && isoperator(str[str.length-2]))){
                str=str.slice(0,-1)
                str+=this.innerText
            }
            else{
                str+=this.innerText
            }
        }
        else{
            str+=this.innerText
        }
        result.innerHTML=str
    })
}

