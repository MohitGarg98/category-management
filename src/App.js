import { useState } from 'react';
import Tree from './Tree';
import './App.css';

function App() {
  const [arr, setArr] = useState([])
  const [addCat, setAddCat] = useState(false)
  const [initialInputValue, setInitialInputValue] = useState('')

  const initialInputValueFunc = e => {
    setInitialInputValue(e.target.value)
  }

  const saveDataFunc = () => {
    setArr(prev => {
      return [...prev, { name: initialInputValue, level: 1, subCom: [] }]
    })
    setAddCat(false)
    setInitialInputValue('')
  }

  return (
    <div className="App">
      <div id='tree-container'>
        <div className="heading-container">
          <span className="heading">Categories</span>
          <button className='add-btn' onClick={() => { setAddCat(true) }}>ADD</button>
          {addCat && <>
            <input className='input-field' placeholder='Enter Value' value={initialInputValue} onChange={initialInputValueFunc} />
            <button className='save-btn' onClick={saveDataFunc}>Save</button>
          </>}
        </div>
        <div className='firstRooot' id='tree-id'>
          <Tree arr={arr} setArr={setArr} />
        </div>
      </div>
    </div>
  );
}

export default App;
