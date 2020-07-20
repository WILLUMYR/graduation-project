import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    // <BrowserRouter>
    //   <div>
    //     <p>Home</p>
    //     <Link className="" to="/login">
    //       Get started!
    //     </Link>
    //     <Switch>
    //       <Route exact path="/"></Route>
    //       <Route exact path="/login"></Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>

    <div>
      <Link className="" to="/login">Get started</Link>
    </div>
  );
}
