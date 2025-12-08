import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Layout from './Apps/Layout'
import Dicecoin from './Apps/Dicecoin'
import Rps from './Apps/Rps'
import Sudoku from './Apps/Sudoku'
import Tictactoe from './Apps/Tictactoe'
import Wordle from './Apps/Wordle'
import Wps from './Apps/Wps'
import Homepage from './Apps/Homepage'
import Fifteen from './Apps/Fifteen'
import Fof from './Apps/Fof'

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='boredgames' element={<Layout />} >
            <Route index element={<Homepage />} />
            <Route path='dicecoin' element={<Dicecoin />} />
            <Route path='rps' element={<Rps />} />
            <Route path='sudoku' element={<Sudoku />} />
            <Route path='tictactoe' element={<Tictactoe />} />
            <Route path='wordle' element={<Wordle />} />
            <Route path='wps' element={<Wps />} />
            <Route path='fifteen' element={<Fifteen />} />
            <Route path='*' element={<Fof />} />
        </Route>

    </>
))


const App = () => {
    return < RouterProvider router={router} />
}

export default App