import React, { useCallback, useState } from 'react'

function SubTree({data, setArr, rowNumber}) {
    const [addData, setAddData] = useState(false)
    const [editData, setEditData] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editValue, setEditValue] = useState(data.name)

    const findSubTree = useCallback(
        row => {
            if(!row){
                return
            } 
            if(row.name === data.name && data.level === row.level){
                data.subCom.push({name: inputValue, level: data.level+1, subCom: []})
                return data
            } else {
                if(row.subCom){
                    row.subCom.forEach(element => {
                        findSubTree(element)
                    });
                }
            }
        }, [data, inputValue]
    )

    const editSubTree = useCallback(
        row => {
            if(!row){
                return
            } 
            if(row.name === data.name && data.level === row.level){
                row.name = editValue
            } else {
                if(row.subCom){
                    row.subCom.forEach(element => {
                        editSubTree(element)
                    });
                }
            }
        }, [data, editValue]
    )

    const deleteSubTree = useCallback(
        (row, level) => {
            if(!row){
                return
            }
            if(row.level === level - 1){
                row.subCom = []
                return
            } else {
                if(row.subCom){
                    row.subCom.forEach(element => {
                        deleteSubTree(element, level)
                    });
                }
            }
        }, []
    )

    const addDataFunc = useCallback(
        () => {
            setAddData(false)
            setArr(prev => {
                findSubTree(prev[rowNumber])
                return [...prev]
            })
        }, [findSubTree, rowNumber, setArr]
    )

    const editDataFunc = useCallback(
        () => {
            setEditData(false)
            setArr(prev => {
                editSubTree(prev[rowNumber])
                return [...prev]
            })
        }, [editSubTree, rowNumber, setArr]
    )

    const deleteDataFunc = useCallback(
        level => {
            setArr(prev => {
                if(level === 1){
                    prev.splice(rowNumber, 1)
                } else {
                    deleteSubTree(prev[rowNumber], level)
                }
                return [...prev]
            })
        }, [deleteSubTree, setArr, rowNumber]
    )

    const inputValueFunc = e => {
        setInputValue(e.target.value)
    }

    const editValueFunc = e => {
        setEditValue(e.target.value)
    }
    
    const showEditFunc = () => {
        setEditData(true) 
        setAddData(false)
    }

    const showAddFunc = () => {
        setAddData(true) 
        setEditData(false)
    }

    return (
        <div className='subtree-container'>
            {editData ? 
            <>
                <input className='input-field' placeholder='Enter Value' value={editValue} onChange={editValueFunc} style={{marginLeft: data.level * 20+'px'}} />
                <button className='save-btn' onClick={editDataFunc}>Save</button>
            </> :
            <span className='data-name' style={{paddingLeft: data.level * 30+'px'}}>{data.name}</span> }

            <button className='add-btn' onClick={showAddFunc}>Add</button>
            <button className='edit-btn' onClick={showEditFunc}>Edit</button>
            <button className='delete-btn' onClick={() => {deleteDataFunc(data.level)}}>Delete</button>
            {addData && <>
                <input className='input-field' value={inputValue} onChange={inputValueFunc}/>
                <button className='save-btn' onClick={addDataFunc}>Save</button>
            </>}
        </div>
    )
}

export default SubTree
