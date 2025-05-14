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
      clickable: true,
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
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const offset = 62;
        const targetY =
          target.getBoundingClientRect().top + window.scrollY - offset;
        smoother.scrollTo(targetY, true);
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

  const dropMenu = () => {
    const btn = document.querySelector(".menu-btn");
    const lines = btn.querySelectorAll(".line");
    const menu = document.querySelector(".menu-list");
    const menuItem = document.querySelectorAll(".menu-item a");

    if (window.innerWidth < 1440) {
      menuItem.forEach((a) => {
        a.addEventListener("click", () => {
          if (menu.style.maxHeight) {
            menu.style.maxHeight = null;
            menu.style.opacity = 0;
          } else {
            menu.style.maxHeight = `${menu.scrollHeight}px`;
            menu.style.opacity = 1;
          }
        });
      });
    }

    btn.addEventListener("click", () => {
      lines.forEach((line) => {
        line.classList.toggle("active");
      });

      if (menu.style.maxHeight) {
        menu.style.maxHeight = null;
        menu.style.opacity = 0;
      } else {
        menu.style.maxHeight = `${menu.scrollHeight}px`;
        menu.style.opacity = 1;
      }
    });
  };

  // inits
  sectionImage();
  accordion();
  dropMenu();
});
