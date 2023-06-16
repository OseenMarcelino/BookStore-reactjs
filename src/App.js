import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import { HomePage } from './HomePage'
import { Register } from "./Register";
import { Login } from "./Login";
import { BookList } from './BookList';
import { Books } from './Books';
import { Edit } from './Edit';
import { Admin } from './admin';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper } from './UserContext';
import Nav from './components/Nav';
import Cart from './List/Cart';
import {Checkout} from './List/Checkout'
// const App = () => (

//   <>
//     {/* <img src={logo} alt="Logo"/> */}
//     <ThemeProvider theme={theme}>

//       {/* <img src={`${process.env.REACT_APP_HOSTED_URL}logo192.png`} alt="App Logo" /> */}

//       <ToastContainer />
//       <BrowserRouter>
//         <div
//         // style={{
//         //   ...globalsStyles.navbar
//         // }} 
//         className={appStyle.navbarStyle}>

//           <Link to="/" style={{ marginLeft: 5, }}>Home</Link>
//           <Link to="/apple" style={{ marginLeft: 5, }}>Register</Link>
//           <Link to="/login" style={{ marginLeft: 5, }}>Login</Link>
//           <Link to="/booklist" style={{ marginLeft: 5, }}>Book List</Link>


//         </div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />}></Route>
//           <Route path="/apple" element={<Apple />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           <Route path="/booklist" element={<BookList />}></Route>


//         </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   </>
// );

function App() {
  return (
    <div className='App'>
      <AppWrapper>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/booklist" element={<BookList />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </AppWrapper>
    </div>
  );
}
export default App;
