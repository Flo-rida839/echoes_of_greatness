import '../styles/comments.css';

function CommentsSection({ articleId }) {
  // In a real app, you would integrate Disqus or Hyvor here
  return (
    <section className="comments-section">
      <h2>Join the Discussion</h2>
      <div className="comments-container">
        <p>Commenting system would be loaded here (Disqus/Hyvor integration)</p>
        <div className="disqus-placeholder">
          {/* This would be replaced with actual Disqus component */}
          <p>Sign in to comment on this historical figure's legacy</p>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;