import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Diamond from '../../models/Diamond';
import { getDiamondsAsync, addDiamondAsync, delDiamondAsync, updDiamondAsync, selectDiamonds ,selectRefresh } from './diamondsSlice';

const Diamonds = () => {

  const refresh = useAppSelector(selectRefresh)
  const diamonds = useAppSelector(selectDiamonds)
  const dispatch = useAppDispatch();

  const [Search, setSearch] = useState('')

  const [carat, setcarat] = useState(0)
  const [cut, setcut] = useState("")
  const [color, setcolor] = useState("")
  const [clarity, setclarity] = useState("");
  const [depth, setdepth] = useState(0)
  const [table, settable] = useState(0)
  const [price, setprice] = useState(0)
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [z, setz] = useState(0);

  const filterDiamonds = diamonds.filter(diamond => diamond.id.includes(Search));

  useEffect(() => {
    dispatch(getDiamondsAsync())
  }, [refresh])

  return (
    <div>

      {/* add diamond */}
      <hr/>
      -Add Diamond- <br/>
      Carat:<input onChange={(e) => setcarat(+e.target.value)}></input><br/>
      Cut:
      <select value={cut} onChange={(e) => setcut(e.target.value)}>
      <option value="">Choose</option>
      <option value="Fair">Fair</option>
      <option value="Ideal">Ideal</option>
      <option value="Good">Good</option>
      <option value="Very Good">Very Good</option>
      <option value="Premium">Premium</option>
    </select><br/>
      Color:
      <select value={color} onChange={(e) => setcolor(e.target.value)}>
      <option value="">Choose</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
      <option value="G">G</option>
      <option value="H">H</option>
      <option value="I">I</option>
      <option value="J">J</option>
    </select><br/>
      Clarity:
      <select value={clarity} onChange={(e) => setclarity(e.target.value)}>
      <option value="">Choose</option>
      <option value="I1">I1</option>
      <option value="IF">IF</option>
      <option value="SI1">SI1</option>
      <option value="SI2">SI2</option>
      <option value="VS1">VS1</option>
      <option value="VS2">VS2</option>
      <option value="VVS1">VVS1</option>
      <option value="VVS2">VVS2</option>
    </select><br/>
      Depth:<input onChange={(e) => setdepth(+e.target.value)}></input><br/>
      Table:<input onChange={(e) => settable(+e.target.value)}></input><br/>
      Price:<input onChange={(e) => setprice(+e.target.value)}></input><br/>
      X:<input onChange={(e) => setx(+e.target.value)}></input><br/>
      Y:<input onChange={(e) => sety(+e.target.value)}></input><br/>
      Z:<input onChange={(e) => setz(+e.target.value)}></input><br/>
      <button onClick={() => dispatch(addDiamondAsync({ carat,cut,color,clarity,depth,table,price,x,y,z }))}>ADD</button>
      <hr/>

      {/* search by id */}
      -find diamond by his id-<br/>
      ID:<input onChange={(e) => setSearch(e.target.value)}></input><hr/>

      {/* display all diamonds */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Carat</th>
            <th>Cut</th>
            <th>Color</th>
            <th>Clarity</th>
            <th>Depth</th>
            <th>Table</th>
            <th>Price</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          {filterDiamonds.map((diamonds, i) => (
            <tr key={i}>
              <td>{diamonds.id}</td>
              <td>{diamonds.carat}</td>
              <td>{diamonds.cut}</td>
              <td>{diamonds.color}</td>
              <td>{diamonds.clarity}</td>
              <td>{diamonds.depth}</td>
              <td>{diamonds.table}</td>
              <td>{diamonds.price}</td>
              <td>{diamonds.x}</td>
              <td>{diamonds.y}</td>
              <td>{diamonds.z}</td>
              <td><button onClick={() => dispatch(updDiamondAsync({ id:diamonds.id,carat: carat ? carat : diamonds.carat, cut: cut ? cut : diamonds.cut, color: color ? color : diamonds.color, clarity: clarity ? clarity : diamonds.clarity, depth: depth ? depth : diamonds.depth, table: table ? table : diamonds.table, price: price ? price : diamonds.price, x: x ? x : diamonds.x, y: y ? y : diamonds.y, z: z ? z : diamonds.z}))}>UPDATE</button></td>
              <td><button onClick={() => dispatch(delDiamondAsync(diamonds.id))}>DELETE</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

    </div>
  )
}

export default Diamonds