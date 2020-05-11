import React from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import './BlogPostList.css'


function BlogPostList() {
  const titles = useSelector(st => st.titles);

  const sortedTitles = titles.sort((a, b) => b.votes - a.votes)

  const blogPostListJSX = sortedTitles.map(title => (
    <BlogPostCard
      key={title.id}
      id={title.id}
      title={title.title}
      description={title.description}
      votes={title.votes}
      />
  ));

  return (
    <Row xs={1} md={2} lg={3}className="BlogPostList">
      {blogPostListJSX}
    </Row>
  )
}

export default BlogPostList;