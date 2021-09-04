import React, {useState, useEffect, useCallback} from 'react'
import SubTree from './SubTree'

function Tree({arr, setArr}) {
    const [displayTree, setDisplayTree] = useState([])
    const printTree = useCallback(
        (data, index) => {
            if(!data){
                return
            }
            if(index === 0 && data.level === 1){
                setDisplayTree(() => [<SubTree key={data.name+''+Math.random()} rowNumber={index} data={data} setArr={setArr}/>])
            } else {
                setDisplayTree(prev => [...prev, <SubTree key={data.name+''+Math.random()} rowNumber={index} data={data} setArr={setArr}/>])
            }
            if(data.subCom){
                data.subCom.forEach(element => {
                    printTree(element, index)
                });
            }
        }, [setArr]
    )

    useEffect(() => {
        if(arr.length){
            arr.map((data, index) => printTree(data, index))
        } else {
            setDisplayTree([])
        }
    }, [arr, printTree])

    return (
        <div>
            { displayTree.map(data => data) }
        </div>
    )
}

export default Tree
