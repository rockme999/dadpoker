document.addEventListener("DOMContentLoaded", function () {
    // 현재 페이지의 깊이 확인 (루트인지, 하위 폴더인지)
    const isRoot = !window.location.pathname.includes("/manual/") && !window.location.pathname.includes("/movie/");
    const basePath = isRoot ? "" : "../";

    // Header 로드
    fetch(basePath + "components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            // 경로 보정
            if (!isRoot) {
                const header = document.getElementById("header-placeholder");
                const links = header.querySelectorAll("a");
                const images = header.querySelectorAll("img");

                links.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href && !href.startsWith("http") && !href.startsWith("#")) {
                        link.setAttribute("href", basePath + href);
                    }
                });

                images.forEach(img => {
                    const src = img.getAttribute("src");
                    if (src && !src.startsWith("http")) {
                        img.setAttribute("src", basePath + src);
                    }
                });
            }

            // 현재 페이지 활성화 표시 (선택 사항)
            const currentPath = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll(".nav-links a");
            navLinks.forEach(link => {
                if (link.getAttribute("href").includes(currentPath)) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => console.error("Error loading header:", error));

    // Footer 로드
    fetch(basePath + "components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;

            // 경로 보정
            if (!isRoot) {
                const footer = document.getElementById("footer-placeholder");
                const links = footer.querySelectorAll("a");
                const images = footer.querySelectorAll("img");

                links.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto")) {
                        link.setAttribute("href", basePath + href);
                    }
                });

                images.forEach(img => {
                    const src = img.getAttribute("src");
                    if (src && !src.startsWith("http")) {
                        img.setAttribute("src", basePath + src);
                    }
                });
            }
        })
        .catch(error => console.error("Error loading footer:", error));
});
