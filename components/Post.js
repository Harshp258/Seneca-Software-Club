const Post = ({ post }) => {
    return (
      <div className="post">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post image" />}
        <div>
          <button>Like ({post.likes.length})</button>
          <button>Comment ({post.comments.length})</button>
        </div>
      </div>
    );
  };
  
  export default Post;