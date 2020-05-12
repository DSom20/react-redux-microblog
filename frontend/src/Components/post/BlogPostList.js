import React, { useEffect, useState, useRef }  from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector, useDispatch } from 'react-redux';
import { getTitlesFromApi } from '../../redux/actions';
import { Flipper, Flipped } from 'react-flip-toolkit'
import Row from 'react-bootstrap/Row';
import './BlogPostList.css'

/*
  Selects titles from redux store. But immediately updates the store
  upon mounting with a API fetch. Thus will update if ppl vote on the titles
*/
function BlogPostList() {
  const titles = useSelector(st => st.titles);
  const titlesRef = useRef(titles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(!titles.length);

  useEffect(() => {
    console.log(titlesRef.current === titles);
    console.log(titles)
    titlesRef.current = titles;
  }, [titles])
  
  useEffect(function() {
    async function fetchTitle() {
      await dispatch(getTitlesFromApi());
      setIsLoading(false);
    }

    if (isLoading) {
      fetchTitle();
    }

  }, [dispatch, isLoading]);

  if (isLoading) return <b>Loading Posts...</b>;

  if (!isLoading && titles.length === 0) {
    return <b>Make the first post!</b>;
  }

  const blogPostListJSX = titles.map(title => (
    <Flipped key={title.id} flipId={title.id}>
      <BlogPostCard
        key={title.id}
        id={title.id}
        title={title.title}
        description={title.description}
        votes={title.votes}
        />
    </Flipped>
  ));

  return (
    <Flipper flipKey={"hi"}>
      <Row xs={1} md={2} lg={3}className="BlogPostList">
        {blogPostListJSX}
      </Row>
    </Flipper>
  )
}

export default BlogPostList;