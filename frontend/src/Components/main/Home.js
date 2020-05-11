import React from 'react';
import BlogPostList from '../post/BlogPostList';
import { Jumbotron, Container, Button, Card } from 'react-bootstrap';
import './Home.css';
import { LinkContainer } from 'react-router-bootstrap'

function Home() {
  // const [ranDispatch, setRanDispatch] = useState(false);
  // const [noTitles, setNoTitles] = useState(false);
  // let titles = useSelector(st => st.titles);
  // console.log({titles});
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const runDispatch = async () => {
  //     await dispatch(getTitlesFromApi());
  //     setRanDispatch(true);
  //   }

  //   if (titles.length === 0 && !ranDispatch) runDispatch();
  //   if (titles.length === 0 && ranDispatch) setNoTitles(true);
  // }, [ranDispatch, dispatch, titles])

  // let mainContentJSX;

  // if (noTitles) {
  //   mainContentJSX = <p>Make the first post!</p>;
  // } else if (titles.length === 0) {
  //   mainContentJSX = <p>Loading Posts...</p>;
  // } else {
  //   mainContentJSX = <BlogPostList />;
  // }

  return (
    <Container className="Home">
      <Jumbotron >
        <h1 className="Home-header mx-0">Welcome to <b>Microblog</b></h1>
        <h3>The best open source blog on the web</h3>
        <hr/>
        <LinkContainer exact to="/posts/new">
          <Button>Add a new post!</Button>
        </LinkContainer >
      </Jumbotron>
      <Card bg="light" className="px-4 py-4 mb-4">
        <div className="site-description">
          <p>This is the opennest of open source blogging.</p>
          <p> Post, edit, delete, comment, vote- as many times as you want! </p>
          <p>We're all administrators here.</p>
        </div>
        <p className="site-description-subtext my-0">[One rule: be kind. When everyone's an administrator, no one is :) ]</p>
      </Card>
      <BlogPostList />
    </Container>
  )
}

export default Home;