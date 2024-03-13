import React, {useEffect, useState} from 'react';
import s from './CommunityNews.module.scss'
import {useNavigate} from "react-router-dom";
import {AiFillCheckCircle, AiFillStar} from "react-icons/ai";
import {BiSolidRightArrowAlt} from "react-icons/bi";
import 'glider-js/glider.min.js';
import 'glider-js/glider.min.css';
import {HiPlusSmall} from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import ComNewsItem from "./comnewsitem/ComNewsItem";



const CommunityNews = ({coinsData}) => {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isSwiperHovered, setIsSwiperHovered] = useState(false);
    const handleSwiperMouseEnter = () => {
        setIsSwiperHovered(true);
    };

    const handleSwiperMouseLeave = () => {
        setIsSwiperHovered(false);
    };

    const navigate = useNavigate();





    return (

        <div className={`${s.community_item} ${isScrolled ? s.index : ''}`}>

            <div className={s.community_item_title}>

                <AiFillStar size={25} color='yellow'/> <h2 className={s.title}>Top Community News</h2>

                    <span onClick={() => navigate('/news')}>More <BiSolidRightArrowAlt size={20} color='blue'/></span>

            </div>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={!isSwiperHovered ? { delay: 7000, disableOnInteraction: false } : false}
                pagination={{
                    clickable: true,

                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                onMouseEnter={handleSwiperMouseEnter}
                onMouseLeave={handleSwiperMouseLeave}
            >
                <SwiperSlide>
                                <ul>
                                    {coinsData && coinsData.slice(0, 5).map((item) => (
                                        <a  key={item.id} href={item.twitterUrl} target="_blank" rel="noopener noreferrer">
                                        <li key={item.id} className={s.trending_list_item}>


                                                <img src={item.icon} draggable={false}/>

                                                {item.name}

                                                <AiFillCheckCircle size={15} color='blue'/>

                                                <span>@{item.symbol}</span>

                                            <div className={s.rank}>
                                                    <div className={s.follow}><HiPlusSmall size={15} color='gray'/> Follow</div>
                                            </div>
                                        </li>
                                        </a>
                                    ))}
                                </ul>


                </SwiperSlide>
                <SwiperSlide>
                    <ComNewsItem/>
                </SwiperSlide>

            </Swiper>

        </div>

    );
};

export default CommunityNews;