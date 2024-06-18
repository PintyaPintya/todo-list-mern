import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //States
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //create
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/item', { "item": itemText });
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  }

  //delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/item/${id}`);
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  }

  //update
  const updateItem = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/item/${isUpdating}`, { item: updateItemText });
      const updatedItemIndex = listItems.findIndex(item => item._ud === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getItems = async (e) => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [])

  return (
    <div className='APP'>
      <div>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <div id='division'>
          <label htmlFor='input1' id='h3'>Task Name</label>
          <input style={{ marginRight: "15px" }} placeholder='Add your task...' type='text' id='input1' name='notes' value={itemText} onChange={e => setItemText(e.target.value)} />
          <button style={{ fontSize: '30px', marginLeft: '15px', }} type='button' onClick={addItem}>Submit</button>
        </div>
        {
          listItems.map((item =>
            item._id === isUpdating ? (
              <ul
                style={{ display: 'flex', justifyContent: 'space-around' }}
                key={item._id}
              >
                <input style={{ fontSize: '20px', borderRadius: '4px' }}
                  id='input1'
                  value={updateItemText}
                  onChange={(e) => setUpdateItemText(e.target.value)}
                />
                <button style={{ marginTop: '15px', color: 'black', backgroundColor: 'green' }} onClick={updateItem}>Update</button>
              </ul>
            ) : (
              <ul key={item._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p>{item.item}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button style={{ color: 'black', backgroundColor: 'yellow', margin: '12px' }} onClick={() => {
                      setIsUpdating(item._id);
                      setUpdateItemText(item.item);
                    }}>Edit</button>
                    <button style={{ color: 'black', backgroundColor: 'red', margin: '12px' }} onClick={() => {
                      deleteItem(item._id);
                    }}>Delete</button>
                  </div>
                </div>
              </ul>
            )
          ))}
      </div>
    </div>
  );
}

export default App;
