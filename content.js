const targetURL = "chat.openai.com"; 

const hideBeforeClass = 'hide-before';

// Check if the style rule already exists; if not, add it
if (!document.querySelector(`style[data-class="${hideBeforeClass}"]`)) {
    let style = document.createElement('style');
    style.setAttribute('data-class', hideBeforeClass);  // Adding a data attribute to identify the style later
    style.innerHTML = `.${hideBeforeClass}::before { display: none; }`;
    document.head.appendChild(style);
}



function setJustifyAndDirection() {
	let result = String(!window.location.href);
    try {
        console.log("Current window location:", window.location.href); // Log the href
    if (result.includes(targetURL)) {
            return;
        };
	document.querySelectorAll('div[role="alert"]').forEach(divElement => {
    if (divElement.style.display != "none") {
        divElement.style.display = "none";
    }
});

    document.querySelectorAll('div.empty\\:hidden').forEach(divElement => {
            divElement.style.textAlign = "justify";
        });

    document.querySelectorAll('body *').forEach(element => {
            let firstChar = element.textContent && element.textContent.trim().charAt(0);
            if (firstChar && /[\u0600-\u06FF]/.test(firstChar)) {
                element.style.direction = "rtl";
            } else if (firstChar && /[A-Za-z]/.test(firstChar) && element.style.direction === "rtl") {
                element.style.direction = "ltr";
            }
        });

    document.querySelectorAll('div.p-4.overflow-y-auto').forEach(divElement => {
            divElement.style.direction = "ltr";
        });

    document.querySelectorAll('p, li').forEach(element => {
            let firstChar = element.textContent && element.textContent.trim().charAt(0);
            if (firstChar && /[\u0600-\u06FF]/.test(firstChar)) {
                element.style.direction = "rtl";
				if (element.tagName.toLowerCase() === "li"){
					element.classList.add(hideBeforeClass);
				}
            } else if (firstChar && /[A-Za-z]/.test(firstChar) && element.style.direction === "rtl") {
                element.style.direction = "ltr";
            }
            element.style.textAlign = "justify";
        });
	
    } catch (error) {
        console.error("Error in setJustifyAndDirection:", error);
    }
}

const observer = new MutationObserver(() => {
    setJustifyAndDirection();
});

// Start observing changes
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});