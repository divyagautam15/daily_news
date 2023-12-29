import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Snipper from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArtical] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)


    const captipFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=>{
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArtical(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `News - ${captipFirstLetter(props.category)}`;
        updateNews();
    },[])

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     updateNews();
    // }
    

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArtical(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setLoading(false)
    };

    return (
    <>
        <h2 className='text-center' style={{margin:'90px 0 30px 0'}}>Daily News - Top {captipFirstLetter(props.category)} Headlines</h2>
        <InfiniteScroll  dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== articles.totalResults} loader={<Snipper/>}>
            <div className='container'>
                <div className='row'>
                    {articles.map((element)=>{            
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2023/12/08/1600x900/1_1702029217511_1702029552351.png"} news_url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
            </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults/pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
    )
}

News.defaultProps = {
    country : 'in',
    pageSize: 8,
    category: 'science',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
