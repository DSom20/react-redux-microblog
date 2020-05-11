import React from 'react';
import NewBlogPost from '../post/NewBlogPost';
import BlogPost from '../post/BlogPost';
import Home from './Home';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom';

function Routes() {

  return (
    <Switch >
      <Route exact path="/posts/new">
        <NewBlogPost />
      </Route>
      <Route path="/posts/:postId">
        <BlogPost />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;