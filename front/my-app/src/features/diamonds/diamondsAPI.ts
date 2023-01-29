import axios from 'axios';
import Diamond from '../../models/Diamond';

const MY_SERVER = "http://127.0.0.1:5000"

export async function getDiamonds() {
  return await axios.get(MY_SERVER)
}

export async function addDiamond(diamond:Diamond) {
  return await axios.post(MY_SERVER + "/add" ,diamond)
}

export async function updDiamond(diamond:Diamond) {
  return await axios.put(MY_SERVER + "/upd/" + diamond.id ,diamond)
}

export async function delDiamond(id:number) {
  return await axios.delete(MY_SERVER + "/del/" + id)
}
