import React from "react";
import { Helmet } from 'react-helmet-async';

const Meta = (props) => {
    return (
        <Helmet>
            <meta charset='utf-8'/>
            <title>{props.title}</title>
            {/*SEO 태그*/}
            <meta name='description' content={props.description}/>
            <meta name='keywords' content={props.keywords}/>
            <meta name='author' content={props.author}/>
            <meta name='og:type' content='website'/>
            <meta name='og:title' content={props.title}/>
            <meta name='og:description' content={props.description}/>
            <meta name='og:image' content={props.image}/>
            <meta name='og:url' content={props.url}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: '단군마켓',
    description: '당근마켓 벤치마킹 프로젝트',
    keywords: 'React, Node, 당근마켓, 포토폴리오, 프로젝트',
    author: '팀 단군',
    image: window.location.protocol + '//' +window.location.hostname + window.location.port +'logo.png',
    url: window.location.href,
}

export default Meta;