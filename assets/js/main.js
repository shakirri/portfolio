    (function () {
      const ld = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Redwanul Islam Shakir",
        "url": "https://shakirri.github.io/portfolio/",
        "sameAs": [
          "https://linkedin.com/in/shakirri",
          "https://github.com/shakirri"
        ],
        "jobTitle": "Software Engineer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Milan",
          "addressCountry": "IT"
        }
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(ld);
      document.head.appendChild(script);
    })();

    (function () {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealItems = document.querySelectorAll(".reveal");
      const scrubText = document.getElementById("scrub-text");

      if (scrubText) {
        scrubText.innerHTML = scrubText.textContent
          .split(" ")
          .map((word) => '<span class="scrub-word">' + word + '</span>')
          .join(" ");
      }

      if (reducedMotion) {
        document.querySelectorAll(".scrub-word").forEach((word) => {
          word.style.color = "rgba(244, 239, 227, 0.92)";
        });
        return;
      }

      const loadScript = (src) => new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      const initMotion = () => {
        if (!window.gsap || !window.ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".portrait-wrap img", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        revealItems.forEach((item) => {
          gsap.fromTo(item, {
            opacity: 0,
            y: 34
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%"
            }
          });
        });

        ScrollTrigger.create({
          trigger: "#experience",
          start: "top top",
          end: "bottom bottom",
          pin: "#pin-title",
          pinSpacing: false
        });

        gsap.utils.toArray(".bento-card, .about-media, .accordion-panel").forEach((item) => {
          gsap.fromTo(item, {
            scale: 0.92,
            opacity: 0.32
          }, {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "bottom 18%",
              scrub: true
            }
          });
        });

        gsap.to(".scrub-word", {
          color: "rgba(244, 239, 227, 0.94)",
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 58%",
            end: "bottom 46%",
            scrub: true
          }
        });
      };

      loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js")
        .then(() => loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"))
        .then(initMotion)
        .catch(() => {
          document.querySelectorAll(".scrub-word").forEach((word) => {
            word.style.color = "rgba(244, 239, 227, 0.92)";
          });
        });
    })();
