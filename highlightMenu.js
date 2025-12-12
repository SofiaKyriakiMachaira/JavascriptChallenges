// Problem: User should know which option (webpage) from the navigation menu they're currently viewing.
// Solution: Allow PrimeFaces navigation menu options to be highlighted dynamically, even if user didn't use the nav menu at all.

function highlightMenu() {
    const pathName = window.location.pathname;
    const current = pathName.split("/").pop().split("?")[0];
    const checkPathName = pathName.split("/")[1];
    let counter = 0;

    document.querySelectorAll(".ui-menuitem-link.ui-corner-all").forEach(link => { // JSF PrimeFaces p:menuitem component default classes
        if (!link.getAttribute("href")) return;
        if (!current || current === "" || checkPathName === current) {
            if (link.getAttribute("href").includes("index")) { // Check user landed in welcome page, which is index in our case
                if (counter === 0)
                    link.classList.add("highlighted-item");
                counter = counter + 1; // Avoid the case of multiple links leading to a page that includes "index" string
            }
        }
        else if (link.getAttribute("href").includes(current)) {
            link.classList.add("highlighted-item");
        }
    });
}


 $(document).ready(function () {
    highlightMenu();

    $(document).on('pfAjaxComplete', function () { // For JSF PrimeFaces applications AJAX lifecycle
        highlightMenu();
    });
});

/* Example CSS for highlighted-item:
.highlighted-item {
    background-color: var(--highlight-bg);
    color: var(--highlight-txt);
} */