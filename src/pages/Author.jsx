import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFollowed(false);
    setCopied(false);
    if (!authorId) {
      setAuthor(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
      })
      .catch(() => {
        setAuthor(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authorId]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const followers = author ? author.followers + (followed ? 1 : 0) : 0;

  const copyAddress = () => {
    if (!author?.address) {
      return;
    }
    navigator.clipboard.writeText(author.address).catch(() => {});
    setCopied(true);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="200px" height="24px" />
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton width="100px" height="16px" />
                            ) : (
                              `@${author?.tag}`
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton width="180px" height="16px" />
                            ) : (
                              author?.address
                            )}
                          </span>
                          {!loading && (
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={copyAddress}
                            >
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="150px" height="40px" />
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <button
                            className="btn-main"
                            onClick={() => setFollowed((value) => !value)}
                          >
                            {followed ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    loading={loading}
                    authorImage={author?.authorImage}
                    authorId={author?.authorId}
                    nftCollection={author?.nftCollection}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
