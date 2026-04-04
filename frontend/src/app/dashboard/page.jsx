"use client";
import DashboardLayout from "@/layout/dashboardLayout";
import UserLayout from "@/layout/userLayout";
import useAppStore from "@/store/useAppStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";

function Dashboard() {
  const user = useAppStore((state) => state.user);
  const addPost = useAppStore((state) => state.addPost);
  const posts = useAppStore((state) => state.posts);
  const getAllPosts = useAppStore((state) => state.getAllPosts);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  console.log(posts);
  const [formData, setFormData] = useState({
    content: "",
    media: "",
  });
console.log(posts);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("content", formData.content);
    if (formData.media) {
      data.append("media", formData.media);
    }

    await addPost(data);
    setFormData({
      content: "",
      media: null,
    });
  };

  function getMediaType(url) {
  if (!url) return null;
  const ext = url.split('.').pop().toLowerCase().split('?')[0];
  if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  return 'unknown';
}

function getFileName(url) {
  return decodeURIComponent(url.split('/').pop());
}

function getInitials(userId) {
  // Show last 4 chars of user_id as avatar label
  return userId?.slice(-4).toUpperCase() ?? '??';
}

function MediaBlock({ url }) {
  const type = getMediaType(url);

  if (type === 'image') {
    return (
      <div className={style.mediaWrap}>
        <Image width={300} height={200} src={url} alt="Post media" className={style.mediaImage} />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className={style.mediaWrap}>
        <video
          src={url}
          className={style.mediaVideo}
          controls
          preload="metadata"
        />
      </div>
    );
  }

  if (type === 'pdf') {
    return (
      <div className={style.mediaWrap}>
        <div className={style.mediaPdf}>
          <div className={style.pdfIcon}>PDF</div>
          <div className={style.pdfInfo}>
            <span className={style.pdfName}>{getFileName(url)}</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={style.pdfLink}
            >
              Open document ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}


  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <form action="multipart/form-data" onSubmit={handleSubmit}>
            <div className={style.createPostContainer}>
              <Image
                className={style.profile}
                src={user?.avatar_url || "null"}
                alt="User avatar"
                width={72}
                height={72}
                unoptimized
              />
              <textarea
                value={formData.content}
                onChange={handleChange}
                placeholder="What's in your mind?"
                className={style.postContent}
                name="content"
                id="postContent"
              ></textarea>
              <label htmlFor="fileUpload">
                <svg
                  className={style.postIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </label>
              <input
                name="media"
                onChange={handleChange}
                type="file"
                id="fileUpload"
                className={style.fileInput}
              />
              {formData.content.length > 0 && (
                <button type="submit" className={style.uploadButton}>
                  Post
                </button>
              )}
            </div>
          </form>

           {posts.map((post) => (
        <div key={post.id} className={style.card}>

          {/* Header */}
          <div className={style.header}>
            <div className={style.avatar}>{getInitials(post.user_id)}</div>
            <div className={style.meta}>
              <span className={style.username}>user_{post.user_id.slice(0, 8)}</span>
              <span className={style.postId}>#{post.id.slice(0, 8)}</span>
            </div>
          </div>

          {/* Body */}
          {post.body && <p className={style.body}>{post.body}</p>}

          {/* Media */}
          {post.media && <MediaBlock url={post.media} />}

          {/* Footer */}
          <div className={style.footer}>
            <button className={style.likeBtn} aria-label="Like">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {post.likes}
            </button>
            <div className={style.divider} />
            <button className={style.likeBtn} aria-label="Comment">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Reply
            </button>
          </div>

        </div>
      ))}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default Dashboard;
