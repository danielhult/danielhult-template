import gsap from 'gsap';

export const smoothOriginChange = (element, transformOrigin) => {
  if (typeof(element) === "string") {
    element = document.querySelector(element);
  }
  const before = element.getBoundingClientRect();
  element.style.transformOrigin = transformOrigin;
  const after = element.getBoundingClientRect();
  gsap.set(element, {x:"+=" + (before.left - after.left), y:"+=" + (before.top - after.top)});
}