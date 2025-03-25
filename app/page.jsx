"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEgg,
  faKitchenSet,
  faCookieBite,
  faUser,
  faStar,
  faHeart,
  faLeaf,
  faWheatAwn,
  faArrowRight,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import heroImg from "@/public/images/milkshake&cakepops.png";

// Featured Product Component
const FeaturedProduct = ({ name, description, imageSrc }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-black">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[#e79fc4]">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <span className="ml-1 text-sm text-gray-600">
              Customer Favorite
            </span>
          </div>
          <Link
            href="/order"
            className="text-[#e79fc4] hover:underline flex items-center"
          >
            <span className="mr-1">Order</span>
            <FontAwesomeIcon icon={faArrowRight} size="xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Enhanced Benefit Section Component
const BenefitSection = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg border border-[#e79fc4]/20">
    <div className="w-16 h-16 flex items-center justify-center bg-[#e79fc4]/10 rounded-full mb-4 transform transition-transform duration-500 hover:rotate-12">
      <FontAwesomeIcon icon={icon} size="xl" className="text-[#e79fc4]" />
    </div>
    <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
    <p className="text-center text-gray-700">{description}</p>
  </div>
);

// Enhanced User Review Component
const UserReview = ({ name, comment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-[#e79fc4]/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-[#e79fc4]/10 rounded-full flex items-center justify-center mr-4">
          <FontAwesomeIcon icon={faUser} className="text-[#e79fc4]" />
        </div>
        <div>
          <p className="font-semibold text-black">{name}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="text-[#e79fc4] mr-1"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="absolute -top-2 -left-1 text-[#e79fc4] opacity-20 text-3xl"
        />
        <p className="italic text-gray-700 px-6 py-2">{comment}</p>
        <FontAwesomeIcon
          icon={faQuoteRight}
          className="absolute -bottom-2 right-0 text-[#e79fc4] opacity-20 text-3xl"
        />
      </div>
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, label, icon }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const step = 16; // ~60fps
          const increment = Math.ceil((value * step) / duration);

          const timer = setInterval(() => {
            start += increment;
            if (start > value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, step);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value]);

  return (
    <div ref={counterRef} className="flex flex-col items-center p-4">
      <div className="w-16 h-16 flex items-center justify-center bg-[#e79fc4] rounded-full mb-3 text-white">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <div className="text-3xl font-bold text-black">{count}+</div>
      <div className="text-gray-600 text-center">{label}</div>
    </div>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern.jpg')] opacity-5 z-0"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/60 z-10"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-block bg-[#e79fc4] text-white px-4 py-1 rounded-full text-sm font-medium mb-4 animate-pulse">
              Homemade with Love
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Minnesota's Finest{" "}
              <span className="text-[#e79fc4]">Freshly Baked</span> Goodness
            </h1>
            <p className="text-white/90 text-lg mb-6 max-w-lg">
              Indulge in our handcrafted treats made with premium ingredients
              and baked with passion. From cookies to cakes, we've got your
              sweet cravings covered.
            </p>
            <div className="bg-white/90 p-4 rounded-lg shadow-lg inline-block mb-8">
              <h4 className="text-[#e79fc4] font-medium mb-2">
                Hurry, Limited Quantities Available!
              </h4>
              <h4 className="text-black font-bold">
                *Order by 4:30pm for same-day pickup*
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/order">
                <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
                  ORDER NOW
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition-all">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-700">
              <Image
                src={heroImg || "/placeholder.svg"}
                alt="Milkshake and Cake Pops"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#e79fc4]">
                <FontAwesomeIcon
                  icon={faWheatAwn}
                  size="2xl"
                  className="text-[#e79fc4]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[70px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <AnimatedCounter
              value={500}
              label="Happy Customers"
              icon={faHeart}
            />
            <AnimatedCounter
              value={30}
              label="Unique Recipes"
              icon={faWheatAwn}
            />
            <AnimatedCounter
              value={100}
              label="Fresh Ingredients"
              icon={faLeaf}
            />
            <AnimatedCounter
              value={1000}
              label="Treats Baked"
              icon={faCookieBite}
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Our Most-Loved Treats
            </h2>
            <div className="w-24 h-1 bg-[#e79fc4] mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover our customers' favorites, handcrafted with love and the
              finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeaturedProduct
              name="Chocolate Chip Cookies"
              description="Our signature cookies with premium chocolate chunks and a soft, chewy center."
              imageSrc="/images/Baked Cookies.png"
            />
            <FeaturedProduct
              name="Tres Leches Cake"
              description="Light sponge cake soaked in three kinds of milk, topped with fresh cream."
              imageSrc="/images/tresleches.jpg"
            />
            <FeaturedProduct
              name="Banana Bread"
              description="Moist, sweet loaf made with ripe bananas. It has a soft, cake-like texture and a rich banana flavor. Perfect for breakfast or a snack!"
              imageSrc="/images/banana bread.jpg"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/order">
              <button className="bg-black hover:bg-black/80 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl">
                VIEW ALL PRODUCTS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Baking Secrets Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Our Baking Secrets
            </h2>
            <div className="w-24 h-1 bg-[#e79fc4] mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              What makes our treats special? It's our commitment to quality,
              tradition, and a whole lot of love
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <video
                  width="100%"
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="object-cover"
                >
                  <source src="/images/Baked Cookies.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full p-2 shadow-lg border-2 border-[#e79fc4]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/Cupcake.png"
                    alt="Delicious Cupcake"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 gap-6">
              <BenefitSection
                icon={faEgg}
                title="Fresh Ingredients"
                description="We use only the finest, locally-sourced ingredients to ensure quality in every bite. No preservatives, just pure goodness."
              />
              <BenefitSection
                icon={faKitchenSet}
                title="Unique Recipes"
                description="Our recipes have been perfected over generations, creating flavors you won't find anywhere else. Each treat tells a story."
              />
              <BenefitSection
                icon={faCookieBite}
                title="A Love for Baking"
                description="Every item is crafted with passion and care, just like homemade treats should be. We bake in small batches for maximum freshness."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-[#e79fc4]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-[#e79fc4] mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <UserReview
              name="Fatuma A"
              comment="I had the opportunity to try some of the baked goods from Umm Yahya bakery. The chocolate chip cookies and tres leches were absolutely delicious. Highly recommend!"
            />
            <UserReview
              name="Halima S"
              comment="If there's a bakery you MUST try in the metro area, this is it. The tres leches cake lives up to the hype, and the cookies are fresh and delicious!"
            />
            <UserReview
              name="Hind A"
              comment="Umm Yahya's baked goods are made with passion. After trying her cookies, I couldn't stop reaching for more! Perfect sweetness and texture."
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#e79fc4]/10 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left Text Section */}
              <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Stay Updated
                </h2>
                <p className="text-gray-700 mb-4">
                  Subscribe to our newsletter for special offers, new flavors,
                  and baking tips!
                </p>
                <form
                  onSubmit={subscribe}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e79fc4] flex-grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-black/80 transition-colors"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {message && (
                  <p
                    className={`mt-2 text-sm ${status === "error" ? "text-red-500" : "text-green-500"}`}
                  >
                    {message}
                  </p>
                )}
              </div>
              {/* Right Image Section */}
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/images/Cupcake.png"
                  alt="Newsletter signup"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Our freshly baked goods are made daily in limited quantities. Don't
            miss out on today's batch of delicious treats!
          </p>
          <Link href="/order">
            <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1 text-lg">
              ORDER NOW
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
