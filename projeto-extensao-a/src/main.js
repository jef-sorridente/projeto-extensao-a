// swiper
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// gsap
import { gsap } from "gsap";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText, ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  // swiper
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    loop: true,
    spaceBetween: 32,
    speed: 800,
    freeMode: true,
    freeModeMomentum: true,
    freeModeMomentumVelocityRatio: 0.5,
    modules: [Navigation],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // scroll smoother
  // create the scrollSmoother before your scrollTriggers
  const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    smooth: 1.5,
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // impede o comportamento padrão

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        smoother.scrollTo(target, true);
      }
    });
  });

  // gsap
  // gsap.set(".section-banner", { opacity: 1 });
  // let split = SplitText.create(".title", { type: "words" });

  // gsap.from(split.words, {
  //   opacity: 0,
  //   duration: 2,
  //   ease: "sine.out",
  //   stagger: 0.1,
  // });

  // // trigger
  const triggerImage = () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-image",
        pin: true,
        start: "top",
        scrub: 3,
      },
    });

    tl.to("#image-1", {
      width: 1200,
    });
  };

  // // inits
  triggerImage();
});
