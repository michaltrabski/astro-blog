import { getDataForBuild, getFullUrl } from "../utils/utils";

export default function PostsFromOldWordpress() {
  const { postsFromOldWordpresOrdered50 } = getDataForBuild();

  return (
    <div className="text-start">
      {postsFromOldWordpresOrdered50.map((post, index) => (
        <p>
          {index + 1}.{" "}
          <a href={getFullUrl(post.slug)} className="text-decoration-none">
            {post.title}
          </a>
        </p>
      ))}
    </div>
  );
}
