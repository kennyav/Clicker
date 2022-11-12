import { useState } from 'react'
import './App.css'

type Click = {
  x: number,
  y: number,
}

function App() {

  const [clicks, setClicks] = useState<Click[]>([]);
  const [undoClicks, setUndoClicks] = useState<Click[]>([]);

  // need the speard operator because when react rerenders itll only be updating with the newest points
  function handleClick(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    setClicks([...clicks, {
      x: clientX,
      y: clientY
    }])
  }

  // Takes back the previous move made
  function handleUndo() {
    const temp = clicks;
    const addForRedo = temp.pop();
    if (!addForRedo) return;
    setUndoClicks([...undoClicks, addForRedo]);
    setClicks([...temp]);

  }

  function handleRedo() {
    const temp = undoClicks;
    const redoClick = temp.pop();
    if (!redoClick) return;
    setClicks([...clicks, redoClick]);
    setUndoClicks([...temp]);
  }

return (
  <div>
    <button disabled={clicks.length === 0} className='undo' onClick={() => handleUndo()}>UNDO</button>
    <button disabled={undoClicks.length === 0} className='redo' onClick={() => handleRedo()}>REDO</button>
    <div className="App" onClick={e => handleClick(e)}>
      {clicks.map((click, idx) => (
        <div key={idx} className="click" style={{
          left: click.x - 15 + 'px',
          top: click.y - 15 + 'px',
        }}></div>
      ))}
    </div>
  </div>
)
}

export default App;