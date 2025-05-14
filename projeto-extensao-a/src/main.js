// swiper
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
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
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: true,
    spaceBetween: 32,
    speed: 800,
    freeMode: true,
    freeModeMomentum: true,
    freeModeMomentumVelocityRatio: 0.5,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
    },
  });

  // scroll smoother
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

  const sectionImage = () => {
    gsap.from(".path-line", {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top center",
        scrub: 3,
      },
      drawSVG: "0%",
      duration: 3,
    });
  };

  const accordion = () => {
    let acc = document.getElementsByClassName("accordion-button");

    for (let i = 0; i < acc.length; i++) {
      acc[0].classList.add("active");
      let panel = acc[0].nextElementSibling;
      panel.style.maxHeight = `${panel.scrollHeight}px`;

      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    }
  };

  // inits
  sectionImage();
  accordion();
});
