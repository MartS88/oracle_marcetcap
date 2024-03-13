const scrollToElement = scrollTarget => {
  const element = document.getElementById(scrollTarget);
  element.scrollIntoView({
    behavior: 'smooth',
  });
};

export { scrollToElement };
