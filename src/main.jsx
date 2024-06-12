import React, { useState, useMemo, useCallback } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { FixedSizeList as List } from 'https://esm.sh/react-window@1.8.7';

const Item = React.memo(({ index, selected = [], setSelected }) => {
  const [value] = useState(index);

  const isSelected = useMemo(() => selected.includes(index), [index, selected]);

  const handleOnChange = useCallback(() => {
    setSelected(prevSelected =>
      isSelected
        ? prevSelected.filter(item => item !== index)
        : [...prevSelected, index]
    );
  }, [isSelected, index, setSelected]);

  console.log({index,ss:isSelected});

  return (
    <div style={{ padding: '10px', border: '1px dashed #cecece' }}>
      <img src="https://m.media-amazon.com/images/I/41nl+U3GtQL._S2L250_.jpg" height="50px" />
      <input type="checkbox" checked={isSelected} onChange={handleOnChange} />
      <li>{`Item ${value}`}</li>
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(100);
  const [selected, setSelected] = useState([]);

  const handleClick = () => {
    setCount(count + 1000);
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      <Item index={index} selected={selected} setSelected={setSelected} />
    </div>
  );

  return (
    <div>
      <h1>React Performance Test</h1>
      <button onClick={handleClick}>Add 1000 Items</button>
      <List
        height={600}
        itemCount={count}
        itemSize={100}
        width={'100%'}
      >
        {Row}
      </List>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

