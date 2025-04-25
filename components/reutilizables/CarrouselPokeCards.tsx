"use client";

import React from 'react';
import PokeCard from '../reutilizables/PokeCard';
import { Pokemon } from '@/ts/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Props {
  pokemons: Pokemon[];
}

function CarrouselPokeCards({ pokemons }: Props) {
  return (
    <div className="carrousel-container relative">
      <button className="custom-swiper-button custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <FaArrowAltCircleLeft size={36} />
      </button>
      <button className="custom-swiper-button custom-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <FaArrowAltCircleRight size={36} />
      </button>

      <Swiper
        breakpoints={{
          400: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        loop={true}
        modules={[Pagination, Navigation]}
        className="md:h-[420px] h-[420px]"
      >
        {pokemons.map((pokemon, index) => (
          <SwiperSlide key={index} className="px-8">
            <PokeCard pokemon={pokemon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarrouselPokeCards;
