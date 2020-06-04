import React from 'react';
import TableRow from './TableRow';
const Table = ({proposition, names}) => 
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
        truthValues = processProposition(proposition, names);
        
        for(const prop in truthValues)
        {
            head.push(<th key={prop}>{prop}</th>);
        }
        for(let i = 0; i < truthValues[names[0]].length; i++)
        {
            var td = []
            for(const prop in truthValues)
            {
                console.log('truthValues[prop][i]: ' + truthValues[prop][i]);
                
                td.push(<td key={prop + i}>{truthValues[prop][i] === true ? 'T' : 'F'}</td>)
            }
            body.push(<TableRow td={td} /> )
        }

    }


    return ( 
        <div>
        <div>
            Proposition: {proposition} <br/>
            names: {names}
        </div>
        <table className="ui celled table unstackable">
            <thead>
                <tr>
                    {head}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
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

const separatePropositions = (proposition) =>
{
    var propositionArr = [];
    var str = '';
    var parBuilding = false;
    var negPar = false;
    var connectives = [ 
        '&', 
        '->', 
        '<->',
         'V'
        ];
    for(let i = 0; i < proposition.length; i++)
    {
        if(proposition[i].includes('~') && !proposition[i].includes('~('))
        {
            propositionArr.push(proposition[i]);
        }

        if(parBuilding)
        {
            
                
            
            if(proposition[i] === ')')
            {
                parBuilding = false;
                propositionArr.push(str);
                if(negPar === true)
                {
                    propositionArr.push(`~(${str})`)
                }
            }
            else
            {
                str += proposition[i];
            }
        }

        if(proposition[i] === '(')
        {
            propositionArr.push(str);
            str = '';
            if(proposition[i] === '~(')
            {
                negPar = true;
            }
            
            parBuilding = true;
        }

        if(!parBuilding && str !== '')
        {
            

                str += proposition[i];
            
        }
    }
    propositionArr.push(proposition.join(''))
    console.log(propositionArr);
    return propositionArr;
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
const processProposition = (proposition, names) =>
{
    let truthObj = tableSetup(names);
    console.log(truthObj);
    let propositionArr = [];
    console.log(proposition);
    propositionArr = separatePropositions(proposition)
    propositionArr = buildTruthObj(propositionArr);
    console.log(propositionArr);
    for(let i = 0; i < propositionArr.length; i++)
    {
        var left = [];
        var right = [];
        for(const prop in truthObj)
        {
            if(propositionArr[i].right.includes(prop))
            {
                right = truthObj[prop];
            }

            if(propositionArr[i].left.includes(prop))
            {
                left = truthObj[prop];
            }
            if(propositionArr[i].conn === '~')
            {
                right = 'negation';
            }
        }

        truthObj[propositionArr[i].proposition] = evaluate(left, right, propositionArr[i]);
    }
    console.log('truthObj => '+truthObj);
    
    return truthObj;
}

const makeTable = (truthValues) =>
{
    
}

/**
 * 
 * 
 */
export default Table;