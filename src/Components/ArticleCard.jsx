// function ArticleCard({ article }) {
//     return (
//       <Link to={`/article/${article.id}`} className="article-card-link">
//         <div className="article-card">
//           {article.image_url && (
//             <img
//               src={article.image_url.startsWith('http') ? article.image_url : `/images/${article.image_url}`}
//               alt={article.title}
//               className="card-image"
//             />
//           )}
//           <div className="card-content">
//             <h2 className="card-title">{article.title}</h2>
//             <p className="card-era">{article.era} Era</p>
//             <p className="card-excerpt">
//               {article.content.length > 120
//                 ? `${article.content.slice(0, 120)}...`
//                 : article.content}
//             </p>
//           </div>
//         </div>
//       </Link>
//     );
//   }
  
//   export default ArticleCard;
  