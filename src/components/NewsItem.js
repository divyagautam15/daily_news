import React from 'react'

const NewsItem = (props) => {
  let {title, description, imageUrl, news_url, author, date, source} = props;
  return (
    <div className='my-3'>
      <div className="card">
        
          <span className="badge rounded-pill bg-danger" style={{right: '0px',top: '-10px',position: 'absolute', zIndex: '1'}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className='card-test'><samll className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</samll></p>
              <a rel="noreferrer" href={news_url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
      </div>
    </div>
  )
}

export default NewsItem;
