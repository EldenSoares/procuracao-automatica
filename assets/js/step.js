const steps = document.querySelectorAll("[data-action]");
steps.forEach(step => {
    step.addEventListener('click', e => {
        e.preventDefault()
        fadeOut(document.querySelector(`[data-action="${step.dataset.action}"]`)
        .closest(".data-step"))
            // .style.display = "none"

        fadeIn(document.querySelector(`.${step.dataset.action}`))
            // .style.display = "block"

    })
});

function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .5) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el){
    el.style.opacity = 0;
    el.style.display = "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}