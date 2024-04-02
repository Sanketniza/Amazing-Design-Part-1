function App() {
    React.useEffect(function () {
      var sections = document.querySelectorAll(".section"),
        images = document.querySelectorAll(".background"),
        headings = document.querySelectorAll(".section-title"),
        outerWrappers = document.querySelectorAll(".wrapper-outer"),
        innerWrappers = document.querySelectorAll(".wrapper-inner"),
        currentIndex = -1,
        wrap = function (index, max) {
          return (index + max) % max;
        },
        animating;
  
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
  
      function gotoSection(index, direction) {
        index = wrap(index, sections.length);
        animating = true;
  
        var fromTop = direction === -1;
        var dFactor = fromTop ? -1 : 1;
        var tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut" }, onComplete: function () { animating = false; } });
  
        if (currentIndex >= 0) {
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(sections[currentIndex], { autoAlpha: 0 });
        }
  
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        tl.fromTo([outerWrappers[index], innerWrappers[index]], { yPercent: function (i) { return i ? -100 * dFactor : 100 * dFactor; } }, { yPercent: 0 }, 0)
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
          .fromTo(headings[index], { autoAlpha: 0, yPercent: 150 * dFactor }, { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power2", stagger: { each: 0.02, from: "random" } }, 0.2);
  
        currentIndex = index;
      }
  
      function navigateSectionById(id) {
        var index = Array.from(sections).findIndex(function (section) { return section.id === id; });
  
        if (index !== -1 && index !== currentIndex) {
          gotoSection(index, index > currentIndex ? 1 : -1);
        }
      }
  
      var lastTap = 0;
      document.addEventListener("touchend", function (event) {
        var currentTime = new Date().getTime();
        var tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
          gotoSection(currentIndex + 1, 1);
          event.preventDefault();
        }
        lastTap = currentTime;
      });
  
      window.addEventListener("wheel", function (event) {
        if (event.deltaY < 0 && !animating) {
          gotoSection(currentIndex - 1, -1);
        } else if (event.deltaY > 0 && !animating) {
          gotoSection(currentIndex + 1, 1);
        }
      });
  
      document.querySelectorAll("nav a").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          navigateSectionById(e.currentTarget.getAttribute("href").slice(1));
        });
      });
  
      gotoSection(0, 1);
    }, []);
  
    return (
      React.createElement("div", { className: "app-container" },
        React.createElement("header", { className: "header" },
          React.createElement("nav", null,
            React.createElement("a", { href: "#first" }, "One "),
            React.createElement("a", { href: "#second" }, "Two "),
            React.createElement("a", { href: "#third" }, "Three "),
            React.createElement("a", { href: "#fourth" }, "Four "),
            React.createElement("a", { href: "#fifth" }, "Five")
          )
        ),
        React.createElement(Section, { id: "first", title: "City Skyline", className: "first", bgUrl: "https://images.unsplash.com/photo-1605629713998-167cdc70afa2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1NTR8&ixlib=rb-4.0.3&q=85" }),
        React.createElement(Section, { id: "second", title: "Flowers of friendship", className: "second", bgUrl: "https://images.unsplash.com/photo-1503796964332-e25e282e390f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1NTR8&ixlib=rb-4.0.3&q=85" }),
        React.createElement(Section, { id: "third", title: "Waves in the Ocean", className: "third", bgUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1OTh8&ixlib=rb-4.0.3&q=85" }),
        React.createElement(Section, { id: "fourth", title: "New York City", className: "fourth", bgUrl: "https://images.unsplash.com/photo-1584351583369-6baf055b51a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM4MTB8&ixlib=rb-4.0.3&q=85" }),
        React.createElement(Section, { id: "fifth", title: "dark side of the moon", className: "fifth", bgUrl: "https://images.unsplash.com/photo-1516663713099-37eb6d60c825?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM4MTB8&ixlib=rb-4.0.3&q=85" })
      )
    );
  }
  
  function Section(_ref) {
    var id = _ref.id,
      title = _ref.title,
      className = _ref.className,
      bgUrl = _ref.bgUrl;
    return (
      React.createElement("section", { id: id, className: "section " + className },
        React.createElement("div", { className: "wrapper-outer" },
          React.createElement("div", { className: "wrapper-inner" },
            React.createElement("div", { className: "background", style: { backgroundImage: "url(" + bgUrl + ")" } },
              React.createElement("h2", { className: "section-title" }, title)
            )
          )
        )
      )
    );
  }
  
  ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
  