import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!nftId) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItem(res.data);
      })
      .catch(() => {
        setItem(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [nftId]);

  const details = item || {
    title: "Rainbow Style #194",
    views: 100,
    likes: 74,
    description:
      "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    nftImage,
    ownerName: "Monica Lucas",
    ownerImage: AuthorImage,
    creatorName: "Monica Lucas",
    creatorImage: AuthorImage,
    price: 1.85,
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="400px" borderRadius="8px" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="300px" height="40px" />
                      <div className="item_info_counts">
                        <Skeleton width="80px" height="30px" />
                        <Skeleton width="80px" height="30px" />
                      </div>
                      <Skeleton width="100%" height="80px" />
                      <div className="spacer-40"></div>
                      <Skeleton width="150px" height="20px" />
                      <div className="spacer-10"></div>
                      <Skeleton width="200px" height="50px" />
                      <div className="spacer-40"></div>
                      <Skeleton width="150px" height="20px" />
                      <div className="spacer-10"></div>
                      <Skeleton width="200px" height="50px" />
                      <div className="spacer-40"></div>
                      <Skeleton width="100px" height="30px" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {details.title}
                        {details.tag ? ` #${details.tag}` : ""}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </div>
                      <p>{details.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link
                                to={
                                  details.ownerId
                                    ? `/author/${details.ownerId}`
                                    : "/author"
                                }
                              >
                                <img
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={
                                  details.ownerId
                                    ? `/author/${details.ownerId}`
                                    : "/author"
                                }
                              >
                                {details.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link
                                to={
                                  details.creatorId
                                    ? `/author/${details.creatorId}`
                                    : "/author"
                                }
                              >
                                <img
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={
                                  details.creatorId
                                    ? `/author/${details.creatorId}`
                                    : "/author"
                                }
                              >
                                {details.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
