import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const sliderConfig = {
  loop: true,
  slides: { perView: 1, spacing: 15 },
  breakpoints: {
    "(min-width: 600px)": {
      slides: { perView: 2, spacing: 15 },
    },
    "(min-width: 900px)": {
      slides: { perView: 3, spacing: 15 },
    },
    "(min-width: 1200px)": {
      slides: { perView: 4, spacing: 15 },
    },
  },
};

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!expiryDate) {
    return null;
  }

  const remaining = expiryDate - now;
  if (remaining <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider(sliderConfig);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((res) => {
        setItems(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" id="d-coll-carousel">
            {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="nft__item_wrap">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width="100px" height="20px" />
                        <div style={{ height: 8 }}></div>
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div ref={sliderRef} className="keen-slider">
                {items.map((item) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <Countdown expiryDate={item.expiryDate} />
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <button type="button">
                                <i className="fa fa-facebook fa-lg"></i>
                              </button>
                              <button type="button">
                                <i className="fa fa-twitter fa-lg"></i>
                              </button>
                              <button type="button">
                                <i className="fa fa-envelope fa-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="owl-prev"
              type="button"
              onClick={() => instanceRef.current?.prev()}
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <button
              className="owl-next"
              type="button"
              onClick={() => instanceRef.current?.next()}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
