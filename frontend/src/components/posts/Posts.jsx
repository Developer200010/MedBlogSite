import Post from "../post/Post";
import "./posts.css";

export default function Posts({post}) {
  console.log(post)
  return (
    <>
    <div className="posts">
      {post.map((data)=>
      (
           <Post data =  {data} img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      ))}
      </div>
    </>
  );
}
