import "./switcher.js";

const ctaButton = document.getElementById("cta-button");
const aboutSection = document.getElementById("about");

if (ctaButton && aboutSection) {
  ctaButton.addEventListener("click", () => {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
}

const aboutProjectsButton = document.getElementById("about-projects-button");
const projectsSection = document.getElementById("projects");

if (aboutProjectsButton && projectsSection) {
  aboutProjectsButton.addEventListener("click", () => {
    projectsSection.scrollIntoView({ behavior: "smooth" });
  });
}

const scrollingLinks = [...document.getElementsByClassName("scrolling-link")];

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    const link = scrollingLinks.find((l) => {
      const scrollToId = l.dataset.scrollTo;
      return (scrollToId && document.getElementById(scrollToId)) === entry.target;
    });

    if (link) {
      if (entry.intersectionRect.height / window.innerHeight > 0.5) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
};

function setupIntersectionObserver() {
  let observer;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [...new Array(50)].map((_, i) => i / 50),
  };

  observer = new IntersectionObserver(handleIntersection, options);
  return observer;
}

const observer = setupIntersectionObserver();
scrollingLinks.forEach((link) => {
  const scrollToId = link.dataset.scrollTo;
  const scrollToElement = scrollToId && document.getElementById(scrollToId);

  if (scrollToElement) {
    observer.observe(scrollToElement);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToElement.scrollIntoView({ behavior: "smooth" });
    });
  }
});

const nav = document.getElementById("nav");

document.addEventListener("scroll", () => {
  const scrollThreshold = window.innerHeight * 0.25;

  if (window.scrollY > scrollThreshold) {
    if (nav?.classList.contains("hidden")) {
      requestAnimationFrame(() => nav?.classList.remove("hidden"));
    }
  } else {
    if (!nav?.classList.contains("hidden")) {
      requestAnimationFrame(() => nav?.classList.add("hidden"));
    }
  }
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = formData.get("subject");
    const body = formData.get("body");
    const mailtoLink = document.createElement("a");
    mailtoLink.href = encodeURI(`mailto:santoshsowndappan@gmail.com?subject=${subject}&body=${body}`);
    mailtoLink.click();
  });
}