import React from 'react';
import TableRow from './TableRow';
const Table = ({proposition, names, openCount, closeCount, text}) => 
{
    var truthValues;
    var head = [];
    var body = [];
    console.log('props type ' + typeof(proposition))
    if(proposition.length === 0)
    {
        return <div></div>
    }
    else
    {
        truthValues = processProposition(proposition, names, openCount, closeCount, text);
        
        // for(const prop in truthValues)
        // {
        //     head.push(<th key={prop}>{prop}</th>);
        // }
        // for(let i = 0; i < truthValues[names[0]].length; i++)
        // {
        //     var td = []
        //     for(const prop in truthValues)
        //     {
        //         console.log('truthValues[prop][i]: ' + truthValues[prop][i]);
                
        //         td.push(<td key={prop + i}>{truthValues[prop][i] === true ? 'T' : 'F'}</td>)
        //     }
        //     body.push(<TableRow td={td} /> )
        // }

    }


    return ( 
        <div>
        <div>
            Proposition: {proposition} <br/>
            names: {names}
        </div>
        // <table className="ui celled table unstackable">
        //     <thead>
        //         <tr>
        //             {head}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {body}
        //     </tbody>
        // </table>
        </div>
        )

    
}

/**
 * 
 * @param num: 2^num = the length of the array of truth values 
 * @param flip: mod to determine how many bool before !bool
 */
const makePart = (num, flip) =>
{
    let arr = [];
    let bool = false;
    for(let i = 0; i<Math.pow(2, num); i++)
    {
        if(i % flip === 0)
        {
            bool = !bool;
        }
        arr.push(bool);
    }
    return arr;
}
/**
 * 
 * @param names
 * @description set up possible truth values for names
 */
const tableSetup = (names) =>
{
    let obj = {};
    let incr = 1;
    let num = names.length;
    for (let i = 0; i<num; i++)
    {
        obj[names[i]] = makePart(num, incr)
        
        incr = incr * 2;
    }
    return obj;
}

const separatePropositions = (proposition, openCount) =>
{
    let propArr = [];
    let part = [];
    let parArr=[]
    let negArray = [];
    let maxPar = 0;
    let negReg = false;
    let parBuilding = false;
    for(let i = 0; i < proposition.length; i++)
    {
        if(negReg)
        {
                part.push({value: '~', type: 'negation'});
                part.push(proposition[i]);
                negReg = false;
        }

        if(proposition[i].type === 'negation')
        {
            if(proposition[i + 1].type === 'open')
            {
                proposition[i].negationStation = maxPar;
                negArray.push(proposition[i]);
            }
            else
            {
                negReg = true;
            }
        }

        if(proposition[i].type === 'close')
        {
            maxPar -= 1;
            if(proposition[i].count === openCount)
            {
                parBuilding = false;
            }
            else
            {
                if(maxPar > 0)
                {   
                    for(let k = 0; k <= maxPar; k++)
                    {
                        parArr[k].push(proposition[k]);
                    }
                }
                else
                {
                    parArr[maxPar].push(proposition[i]);
                }
            }
        }

        if(parBuilding)
        {
            if(maxPar > 0)
            {
                for(let j = 0; j <= maxPar; j++)
                {
                    if(parArr[j] == undefined)
                    {
                        parArr[j] = [proposition[i]]
                    }
                    else
                    {

                        parArr[j].push(proposition[i]);
                    }
                }
            }
            else
            {
                parArr[0] = [proposition[i]];
            }
        }
        else
        {
            
            if(proposition[i].type !== 'close' || proposition[i].type !== 'open' || proposition[i].type !== 'negation')
            {
                part.push(proposition[i]);
            }
        }

        if(proposition[i].type === 'open')
        {
            if(part.length > 1)
            {
                propArr.push(part);
                part = [];
            }
            parArr[maxPar] = [proposition[i]];
            maxPar = proposition[i].count;
            parBuilding = true;
        }

        
    }
    propArr.push(part);
    if(parArr.length > 0)
    {
        for(let l = 0; l < parArr.length; l++)
        {
            propArr.push(parArr[l]);
        }
    }

    if(negArray.length > 0)
    {
        for(let m = 0; m < negArray.length; m++)
        {
            let temp = [negArray[m], {value: '(', type: 'open'}];
            temp.concat(propArr[negArray[m].negationStation]);
            temp.push({value:')', type: 'close'});
            propArr.push(temp);
        }
    }
    console.log(propArr);
}

const findConnective = (str) => 
{
    let obj = {proposition: str};
    let strArr = str.split('')
    let connectives = ['&', 'V', '->', '<->'];
    let parenCount = 0;
    var conn = '';
    var left = '';
    var right = '';
    for(let i = 0; i < strArr.length; i++)
    {   
        if(strArr[i] === '(' )
        {
            parenCount += 1;
        }
        if(strArr[i] === ')')
        {
            parenCount -=1;
        }
        if(conn.length > 0)
        {
            right += strArr[i];
        }
        if(connectives.includes(strArr[i]) && parenCount === 0)
        {
            conn = strArr[i];
        }
        if(conn.length === 0)
        {
            left += strArr[i];
        }
        
    }
    obj.left = left;
    if(left === obj.proposition && left.includes('~'))
    {
        conn = '~';
    }
    obj.conn = conn;
    obj.right = right;
    return obj;
}

const buildTruthObj = (propArr) => 
{
    let res = [];
    for(let i = 0; i < propArr.length; i++)
    {
        let propObj = {};
        if(propArr[i].length === 0)
        {
           propArr.splice(propArr[i], 1);
           
        }
        propObj = findConnective(propArr[i]);
        res.push(propObj);
    }
    return res;
}

const ifThen = (left, right) => 
{
    if(left && !right)
    {
        return false;
    }
    return true;
}

const ifAndOnlyIf = (left, right) =>
{
    console.log(left === right);
    return left === right;
}

const evaluate = (left, right, propArr) => 
{
    console.log('proposition: ' + JSON.stringify(propArr));
    console.log('right: ' + right);
    console.log('left: ' + left);
    console.log('------------------------')
        let arr = [];
        for(let j = 0; j < left.length; j++)
        {
            if(propArr.conn === '~')
            {
                arr.push(!left[j]);
            }
            if(propArr.conn === '&')
            {
                arr.push(left[j] && right[j]);
            }
            if(propArr.conn === 'V')
            {
                arr.push(left[j] || right[j]);
            }
            if(propArr.conn === '->')
            {
                arr.push(ifThen(left[j], right[j]));
            }
            if(propArr.conn === '<->')
            {
                arr.push(ifAndOnlyIf(left[j], right[j]));
            }
        }
        console.log(arr);
        return arr;
}

/**
 * @param proposition: array of proposition elements
 * @param names: array of names
 * @description navigate proposition evaluation
 */
const processProposition = (proposition, names, openCount, closeCount) =>
{
    let truthObj = tableSetup(names);
    console.log(truthObj);
    let propositionArr = [];
    console.log(proposition);
    propositionArr = separatePropositions(proposition)
    console.log(propositionArr);
    
    // propositionArr = buildTruthObj(propositionArr);
    // console.log(propositionArr);
    // for(let i = 0; i < propositionArr.length; i++)
    // {
    //     var left = [];
    //     var right = [];
    //     for(const prop in truthObj)
    //     {
    //         if(propositionArr[i].right.includes(prop))
    //         {
    //             right = truthObj[prop];
    //         }

    //         if(propositionArr[i].left.includes(prop))
    //         {
    //             left = truthObj[prop];
    //         }
    //         if(propositionArr[i].conn === '~')
    //         {
    //             right = 'negation';
    //         }
    //     }

    //     truthObj[propositionArr[i].proposition] = evaluate(left, right, propositionArr[i]);
    // }
    // console.log('truthObj => '+truthObj);
    
    // return truthObj;
}

const makeTable = (truthValues) =>
{
    
}

/**
 * 
 * 
 */
export default Table;