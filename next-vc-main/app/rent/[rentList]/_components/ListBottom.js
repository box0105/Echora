'use client'

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import RentCards from '../../_components/Rentcard/card'; // 引入 RentCards 组件
// Swiper 样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ListBottom() {
  const [data, setData] = useState([]);  // 存储数据
  const [isLoading, setIsLoading] = useState(true);  // 加载状态
  const [isError, setIsError] = useState(false);  // 错误状态

  const getData = async () => {
    try {
      const res = await fetch('https://echora-kwvs.onrender.com/api/rent');  // 你的 API 地址
      const result = await res.json();
      console.log(result);
      
      // 获取随机的10个数据
      const randomData = getRandomItems(result.data, 10);
      setData(randomData);  // 设置数据
    } catch (err) {
      console.log(err);
      setIsError(true);  // 设置错误状态
    } finally {
      setIsLoading(false);  // 请求完成后关闭加载状态
    }
  }

  useEffect(() => {
    getData();  // 在组件加载时调用 getData 函数获取数据
  }, []);  // 空依赖数组，确保只在组件加载时调用一次

  const getRandomItems = (array, count) => {
    const shuffled = [...array];  // 复制原数组
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // 随机索引
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];  // 交换位置
    }
    return shuffled.slice(0, count);  // 取前count个元素
  };

  if (isLoading) {
    return <p className="text-center">加载中...</p>;  // 加载时显示
  }

  if (isError) {
    return <p className="text-center">加载失败，请稍后再试。</p>;  // 错误时显示
  }

  if (!data || data.length === 0) {
    return <p className="text-center">暂无商品</p>;  // 数据为空时显示
  }

  return (
    <div className="list-bottom-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          576: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {/* 使用 RentCards 组件渲染商品卡片 */}
            <RentCards data={[item]} />  {/* 这里传递一个包含单个商品的数组 */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
