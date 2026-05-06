import { useState } from 'react'
import './SortBy.css'
export default function SortBy({setCategory,setDateOrder,filterby}){
 
 
    const [selectedFilter,setSelectedFilter] = useState(null)

 const [selected,setSelected] = useState(null)
  const [selectedDate,setSelectedDate] = useState(null)

    return(
        <>
        <div className="sort-wrapper">
            <div className="sortflex-box">
                <h4 className="inter-sortby">Sort By:</h4>
                <select 
                onChange={(e) => {
    const value = e.target.value;
    setSelectedFilter(value);
   
    if (value === 'category') {    
      setSelectedDate(null);
    }


    if(value === 'allblogs'){
       setCategory(null);
  setDateOrder(null);
  setSelected(null);
  setSelectedDate(null);
    }
  }}
                
                className='sort-selector'>
                     <option value="allblogs">{filterby}</option>
                     <option value="category">Category</option>
                     <option value="date">Date</option>
                </select>
             </div> 
             
            {
            selectedFilter === 'category' && (
                <div className='options-div'>
                {['Photography','Exploration','History'].map(cat =>(
                    <button 
                    key={cat}
                    onClick={() => {
                        setSelected(cat)
                        setCategory(cat)
                    }}
                    className={selected === cat ? 'selected':'select-items'}
                    >
                        {cat}
                    </button>
                ))}
                </div>
            )

            }
            {selectedFilter === 'date' && (
                  <div className='options-div'>
                    {[
                        'Newest','Oldest'
                    ].map(order => (
                        <button
                        key={order}
                        onClick={
                            () => {setSelectedDate(order)
                            setDateOrder(order)
                            setCategory(null)
                            }
                        }
                        className={selectedDate === order ? 'selected':'select-items'}
                        >
                            {order}
                        </button>
                    ))}
                
                </div>

            )}
               
        </div>
        </>
    )
}