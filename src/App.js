import React, {useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_API

  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="general" country="in" category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="business" country="in" category="Business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="entertainment" country="in" category="Entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="general" category="General"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="health" category="Health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="science" category="Science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="sports" category="Sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="technology" category="Technology"/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
