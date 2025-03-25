"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLeaf,
  faHandsHolding,
  faUtensils,
  faQuoteLeft,
  faQuoteRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// Images
import EaganBakingUtensils from "@/public/images/Bakery-Utensils.png";
import CinnamonBread from "@/public/images/cinnamon bread.jpg";
import BananaBread from "@/public/images/bread.jpg";
import Cake from "@/public/images/cake.jpg";
import Cookies from "@/public/images/cookie.jpg";
import Cookies2 from "@/public/images/cookies2.jpg";
import TresLeches from "@/public/images/tresleches.jpg";

// Timeline Item Component
const TimelineItem = ({ year, title, description, isLeft = true }) => (
  <div
    className={`flex w-full ${isLeft ? "flex-row" : "flex-row-reverse"} mb-8 md:mb-0`}
  >
    <div className="w-1/2 px-4 py-10 hidden md:block"></div>
    <div className="w-full md:w-1/2 relative">
      <div className="absolute inset-0 md:w-6 md:h-full md:left-0 md:ml-[-3px] bg-[#e79fc4]/0">
        <div className="h-full w-[2px] bg-[#e79fc4] mx-auto md:mx-0"></div>
      </div>

      <div className="relative ml-6 md:ml-10 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#e79fc4]">
        <div className="absolute w-5 h-5 rounded-full bg-[#e79fc4] top-6 left-[-14px] border-4 border-white"></div>
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#e79fc4]/10 text-[#e79fc4] rounded-full mb-2">
          {year}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  </div>
);

// Value Card Component
const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="w-16 h-16 mx-auto bg-[#e79fc4]/10 rounded-full flex items-center justify-center mb-4">
      <FontAwesomeIcon icon={icon} className="text-[#e79fc4] text-2xl" />
    </div>
    <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
    <p className="text-gray-700 text-center">{description}</p>
  </div>
);

// Testimonial Component
const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-8 rounded-lg shadow-md relative">
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className="absolute top-4 left-4 text-[#e79fc4]/20 text-4xl"
    />
    <p className="text-gray-700 italic mb-6 relative z-10 px-6">{quote}</p>
    <FontAwesomeIcon
      icon={faQuoteRight}
      className="absolute bottom-12 right-4 text-[#e79fc4]/20 text-4xl"
    />
    <div className="flex items-center">
      <div className="w-12 h-12 bg-[#e79fc4]/20 rounded-full flex items-center justify-center mr-4">
        <span className="text-[#e79fc4] font-bold text-xl">
          {author.charAt(0)}
        </span>
      </div>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

export default function About() {
  // Refs for scroll animations
  const sectionRefs = useRef([]);

  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Add ref to array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src={Cake || "/placeholder.svg"}
            alt="Bakery background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Sweet <span className="text-[#e79fc4]">Journey</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the story behind Umm Yahya's Bakery and our passion for
              creating delicious homemade treats in Minnesota
            </p>
            <div className="w-24 h-1 bg-[#e79fc4] mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-16 md:py-24" ref={addToRefs}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700">
              From humble beginnings to Minnesota's beloved bakery, our journey
              has been filled with passion, dedication, and lots of sugar!
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">A Passion for Baking</h3>
              <p className="text-gray-700 mb-4">
                Our story begins with Umm Yahya, a talented baker with an
                unwavering love for the art of baking. From a young age, she
                spent countless hours in the kitchen, experimenting with
                flavors, perfecting recipes, and sharing her delectable
                creations with family and friends.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a hobby quickly blossomed into a true passion.
                Each recipe was carefully crafted, tested, and refined until it
                reached perfection. The joy that came from seeing people's faces
                light up when tasting her treats was the greatest reward.
              </p>
              <p className="text-gray-700">
                As her passion grew, so did the demand for her baked goods.
                Encouraged by the overwhelming positive feedback and the sheer
                joy her treats brought to others, Umm Yahya decided to turn her
                passion into a bakery business.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={TresLeches || "/placeholder.svg"}
                  alt="Tres Leches Cake"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full p-2 shadow-lg border-2 border-[#e79fc4]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={EaganBakingUtensils || "/placeholder.svg"}
                    alt="Baking Utensils"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <Image
                      src={Cookies || "/placeholder.svg"}
                      alt="Homemade Cookies"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <Image
                      src={BananaBread || "/placeholder.svg"}
                      alt="Homemade Banana Bread"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <Image
                      src={Cookies2 || "/placeholder.svg"}
                      alt="Cookies in Eagan"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <Image
                      src={CinnamonBread || "/placeholder.svg"}
                      alt="Homemade Cinnamon bread"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">
                From Kitchen to Community
              </h3>
              <p className="text-gray-700 mb-4">
                With relentless determination and a burning desire to share her
                creations with a wider audience, Umm Yahya embarked on an
                incredible journey. Starting small from her home kitchen in
                Eagan, Minnesota, she began taking orders from friends,
                neighbors, and local community members.
              </p>
              <p className="text-gray-700 mb-4">
                Word quickly spread about the exceptional quality and taste of
                her baked goods. What began as occasional orders for special
                events soon turned into a steady stream of requests for her
                signature cookies, cakes, and pastries.
              </p>
              <p className="text-gray-700">
                Today, Umm Yahya's Bakery has become a beloved name in the
                Minnesota baking scene. While we've grown, our commitment
                remains the same: to create delicious, homemade treats using
                only the finest ingredients and to share the joy of freshly
                baked goods with our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#e79fc4]/5" ref={addToRefs}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-gray-700">
              Follow the sweet path that led us to where we are today
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#e79fc4] transform -translate-x-1/2"></div>

            <div className="relative">
              <TimelineItem
                year="2018"
                title="The Beginning"
                description="Umm Yahya starts baking for family and friends, perfecting recipes passed down through generations."
                isLeft={true}
              />

              <TimelineItem
                year="2019"
                title="First Orders"
                description="Word spreads about the delicious treats, and Umm Yahya begins taking her first official orders from the local community."
                isLeft={false}
              />

              <TimelineItem
                year="2020"
                title="Growing Demand"
                description="Despite challenges, the bakery sees growing demand as people seek comfort in homemade treats during difficult times."
                isLeft={true}
              />

              <TimelineItem
                year="2021"
                title="Expanding Menu"
                description="The menu expands to include a wider variety of treats, including our now-famous Tres Leches cake and specialty cookies."
                isLeft={false}
              />

              <TimelineItem
                year="2022"
                title="Community Recognition"
                description="Umm Yahya's Bakery receives recognition from local food bloggers and community organizations for exceptional quality."
                isLeft={true}
              />

              <TimelineItem
                year="2023"
                title="Today & Beyond"
                description="With a dedicated following and plans for growth, we continue to serve our community with the same passion and quality that started it all."
                isLeft={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="our-values" className="py-16 md:py-24" ref={addToRefs}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-gray-700">
              The principles that guide everything we do at Umm Yahya's Bakery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={faHeart}
              title="Made with Love"
              description="Every item is baked with the same care and attention as if it were for our own family. We believe love is the secret ingredient that makes our treats special."
            />

            <ValueCard
              icon={faLeaf}
              title="Quality Ingredients"
              description="We use only the finest, freshest ingredients in all our recipes. No preservatives or artificial flavors - just pure, natural goodness."
            />

            <ValueCard
              icon={faHandsHolding}
              title="Community First"
              description="We're proud to be part of the Minnesota community and strive to give back through partnerships with local organizations and events."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#e79fc4]/5" ref={addToRefs}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">What People Say</h2>
            <p className="text-lg text-gray-700">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="The tres leches cake from Umm Yahya's Bakery was the highlight of my daughter's birthday. Everyone kept asking where we got it!"
              author="Sarah Johnson"
              role="Loyal Customer"
            />

            <Testimonial
              quote="As someone with a sweet tooth, I can confidently say these are the best cookies I've ever had. The chocolate chip cookies are simply perfect."
              author="Michael Rodriguez"
              role="Food Blogger"
            />

            <Testimonial
              quote="I ordered treats for our office party and they were a huge hit! Fresh, delicious, and beautifully made. Will definitely order again."
              author="Jennifer Williams"
              role="Business Owner"
            />
          </div>
        </div>
      </section>

      {/* Meet the Baker Section */}
      <section
        id="meet-the-baker"
        className="py-16 md:py-24 bg-white"
        ref={addToRefs}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={Cake || "/placeholder.svg"}
                  alt="Umm Yahya - Master Baker"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full p-2 shadow-lg border-2 border-[#e79fc4]">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-[#e79fc4]/10">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-[#e79fc4] text-3xl"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Meet Umm Yahya</h2>
              <p className="text-gray-700 mb-4">
                Behind every delicious treat is Umm Yahya, our master baker and
                the heart of our bakery. With a passion for baking that began in
                childhood, she has spent years perfecting her craft and
                developing recipes that bring joy to countless people.
              </p>
              <p className="text-gray-700 mb-4">
                Umm Yahya believes that baking is more than following
                recipes—it's about creating moments of happiness and connection.
                Each creation is infused with her dedication to quality and her
                desire to make people smile with every bite.
              </p>
              <p className="text-gray-700 mb-6">
                When she's not in the kitchen experimenting with new flavors or
                perfecting classics, Umm Yahya enjoys spending time with her
                family, exploring Minnesota's food scene, and sharing her
                knowledge with aspiring bakers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/order">
                  <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
                    Order Now
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-transparent hover:bg-[#e79fc4]/10 text-[#e79fc4] border-2 border-[#e79fc4] font-bold py-3 px-8 rounded-full transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black" ref={addToRefs}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Our Homemade Treats?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            From cookies to cakes, we bake everything with love and the finest
            ingredients. Place your order today and taste the difference!
          </p>
          <Link href="/order">
            <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1 text-lg flex items-center mx-auto">
              <span>Order Now</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
