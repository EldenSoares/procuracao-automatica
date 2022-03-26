const steps = document.querySelectorAll("[data-action]");
steps.forEach(step => {
    step.addEventListener('click', e => {
        e.preventDefault()
        document.querySelector(`[data-action="${step.dataset.action}"]`)
            .closest(".data-step")
            .style.display = "none"

        document.querySelector(`.${step.dataset.action}`)
            .style.display = "block"

    })
});
