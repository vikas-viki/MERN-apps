// import "whatwg-fetch";
// import React, {useState,useEffect} from "react";
// import { useParams } from "react-router-dom";
// import Articles from "../Components/Articles";
// import articles from "./article-content";


// const Article = () => {
//     const name = useParams();
//     const article = articles.find(article => article.name === name);

//     const [articleInfo, setArticleInfo] = useState({comments: []});

//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await fetch(`/api/articles/${name}`);
//             const body = await result.json();
//             setArticleInfo(body);
//         }
//         fetchData();
//     }, [name.name]);

//     if (!article) return <h1>Article does not exist!</h1>
//     const otherArticles = articles.filter(article => article.name !== name.name);

//     return (
//         <div className="mb-20">
//             <h1 className="sm:text-4xl text-2xl font-bold mt-6 mb-6 text-gray-900">{article.title}</h1>
//             {article.content.map((paragraph, index) => 
//                 <p className="mb-4" key={index}>{paragraph}</p>
//             )}


//             <h1 className="sm:text-2x text-xl font-bold mt-6 mb-6 text-gray-900">Other Articles:</h1>
//             <div className="flex flex-wrap -m-4">
//             <Articles articles={otherArticles} />
//             </div>
//         </div>
//     );
// }

// export default Article;
