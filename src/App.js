import './App.css';
import {Header} from "./Components/Header";
import {PostList} from "./Components/PostList";

export const App = () => {

  return (
        <div className='container-fluid p-0'>
          <Header />
          <div className='d-flex flex-row'>
              <PostList />
          </div>
        </div>

  );
}

export default App;
