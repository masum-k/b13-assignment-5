const signInBtn = document.getElementById("signInBtn").addEventListener("click", () => {
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;

    if (userName !== "admin" || passWord !== "admin123") {
        alert("Invalid Credentials");
    }
    else {
        const loginSection = document.getElementById("loginSection");
        loginSection.classList.add("hidden")
    }
})



const loadOpenIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => displayOpenIssues(data.data))
};

const loadCloseIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => displayClosedIssues(data.data))
};

const loadAllIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => displayAllIssues(data.data))
};

const loadModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => showModal(data.data))
}

const showModal = (data) => {
    const detailContainer = document.getElementById("detailContainer");

    let labels = "";

    if (data.labels[1] !== undefined) {
        labels = ` 
    <div class="badge border text-[#d97706] border-[#fde68a] bg-[#fff8db]">
    <img src="assets/vector.png" alt="">
    <h3 class="text-[10px]">${data.labels[1].toUpperCase()}</h3>
    </div>`;
    };

    detailContainer.innerHTML = `
    <div>
                        <h2>${data.title}</h2>
                        <div class="flex">
                            <p>
                            <span>${data.status.toUpperCase()}</span>
                            &bull;
                            <span>Opened by <span>${data.assignee}</span>
                            &bull;
                            <span>${data.createdAt}</span>
                            </p>
                            
                        </div>
                        <div class="flex gap-2">
                            <div class="badge border text-[#ef4444] border-[#fecaca] bg-[#feecec]">
                                <img src="assets/bugdroid.png" alt="">
                                <h3 class="text-[10px]">${data.labels[0].toUpperCase()}</h3>
                            </div>
                            ${labels}
                        </div>
                        <div>
                            <p>${data.description}</p>
                        </div>
                        <div class="flex">
                            <div>
                                <p>Assignee:</p>
                                <p>Fahim Ahmed</p>
                            </div>
                            <div>   
                                <p>Priority:</p>                               
                                <p>HIGH</p>                               
                            </div>
                        </div>
                    </div>
    `
    document.getElementById("my_modal_1").showModal();
}

const displayAllIssues = (issues) => {
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.remove("active")

    const closeBtn = document.getElementById("close-btn");
    closeBtn.classList.remove("active")

    const allBtn = document.getElementById("all-btn");
    allBtn.classList.add("active")

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    issues.forEach(issue => {
        const allIssues = document.getElementById("issues-count");
        allIssues.innerText = issue.id;

        const container = document.getElementById("card-container");
        const div = document.createElement("div")

        let btnClass = "";
        if (issue.priority === "high") {
            btnClass = "btn-error";
        } else if (issue.priority === "medium") {
            btnClass = "btn-warning";
        } else if (issue.priority === "low") {
            btnClass = "btn-primary";
        }

        let status = "";
        if (issue.status === "closed") {
            status = `<img src="assets/Closed-Status.png">`
        }
        else {
            status = `<img src="assets/Open-Status.png">`
        }

        let labels = "";
        if (issue.labels[1] !== undefined) {
            labels = ` <div class="badge border text-[#d97706] border-[#fde68a] bg-[#fff8db]">
                            <img src="assets/vector.png" alt="">
                            <h3 class="text-[10px]">${issue.labels[1].toUpperCase()}</h3>
                        </div>`;
        };

        div.innerHTML = `
        <div onclick="loadModal(${issue.id})"class="card bg-base-100 shadow-sm h-full">
                <div class="card-body border-t-2 ${issue.status === "closed" ? "border-t-[#a855f7]" : "border-t-[#00a96e]"}">
                    <div class="flex justify-between">
                        ${status}
                        <button class="btn btn-xs btn-soft ${btnClass}">${issue.priority.toUpperCase()}</button>
                    </div>
                    <div class="space-y-2">
                        <h2 class="card-title text-sm">
                            ${issue.title}
                        </h2>
                        <p class="text-xs">
                            ${issue.description}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <div class="badge border text-[#ef4444] border-[#fecaca] bg-[#feecec]">
                            <img src="assets/bugdroid.png" alt="">
                            <h3 class="text-[10px]">${issue.labels[0].toUpperCase()}</h3>
                        </div>
                       ${labels}
                    </div>
                </div>
                <div class="card-body border-t border-t-[#e4e4e7]">
                    <p>
                        ${issue.author}
                    <p>
                        ${issue.createdAt}
                    </p>
                </div>
            </div>
    `
        container.appendChild(div);
    });
};

const displayOpenIssues = (openIssues) => {
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.add("active")

    const closeBtn = document.getElementById("close-btn");
    closeBtn.classList.remove("active")

    const allBtn = document.getElementById("all-btn");
    allBtn.classList.remove("active")

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const openOnly = openIssues.filter(issue => issue.status === "open");

    const openIssuesCount = document.getElementById("issues-count");
    openIssuesCount.innerText = openOnly.length;

    for (const openIssue of openIssues) {
        let btnClass = "";
        if (openIssue.priority === "high") {
            btnClass = "btn-error";
        } else if (openIssue.priority === "medium") {
            btnClass = "btn-warning";
        } else if (openIssue.priority === "low") {
            btnClass = "btn-primary";
        }

        let status = "";
        if (openIssue.status === "closed") {
            status = `<img src="assets/Closed-Status.png">`
        }
        else {
            status = `<img src="assets/Open-Status.png">`
        }

        let labels = "";
        if (openIssue.labels[1] !== undefined) {
            labels = ` <div class="badge border text-[#d97706] border-[#fde68a] bg-[#fff8db]">
                            <img src="assets/vector.png" alt="">
                            <h3 class="text-[10px]">${openIssue.labels[1].toUpperCase()}</h3>
                        </div>`;
        };

        if (openIssue.status === "open") {
            const div = document.createElement("div")
            div.innerHTML = `
        <div onclick="loadModal(${openIssue.id})"class="card bg-base-100 shadow-sm h-full">
                <div class="card-body border-t-2 border-t-[#00a96e]">
                    <div class="flex justify-between">
                        ${status}
                        <button class="btn btn-xs btn-soft ${btnClass}">${openIssue.priority.toUpperCase()}</button>
                    </div>
                    <div class="space-y-2">
                        <h2 class="card-title text-sm">
                            ${openIssue.title}
                        </h2>
                        <p class="text-xs">
                            ${openIssue.description}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <div class="badge border text-[#ef4444] border-[#fecaca] bg-[#feecec]">
                            <img src="assets/bugdroid.png" alt="">
                            <h3 class="text-[10px]">${openIssue.labels[0].toUpperCase()}</h3>
                        </div>
                       ${labels}
                    </div>
                </div>
                <div class="card-body border-t border-t-[#e4e4e7]">
                    <p>
                        ${openIssue.author}
                    <p>
                        ${openIssue.createdAt}
                    </p>
                </div>
            </div>
    `
            cardContainer.appendChild(div)
        }
    }
};

const displayClosedIssues = (closeIssues) => {
    const closeBtn = document.getElementById("close-btn");
    closeBtn.classList.add("active")

    const openBtn = document.getElementById("open-btn");
    openBtn.classList.remove("active")

    const allBtn = document.getElementById("all-btn");
    allBtn.classList.remove("active")

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const closeOnly = closeIssues.filter(issue => issue.status === "closed");
    console.log(closeOnly)
    const closeIssuesCount = document.getElementById("issues-count");
    closeIssuesCount.innerText = closeOnly.length;

    for (const closeIssue of closeIssues) {
        let btnClass = "";
        if (closeIssue.priority === "high") {
            btnClass = "btn-error";
        } else if (closeIssue.priority === "medium") {
            btnClass = "btn-warning";
        } else if (closeIssue.priority === "low") {
            btnClass = "btn-primary";
        }

        let status = "";
        if (closeIssue.status === "closed") {
            status = `<img src="assets/Closed-Status.png">`
        }
        else {
            status = `<img src="assets/Open-Status.png">`
        }

        let labels = "";
        if (closeIssue.labels[1] !== undefined) {
            labels = ` <div class="badge border text-[#d97706] border-[#fde68a] bg-[#fff8db]">
                            <img src="assets/vector.png" alt="">
                            <h3 class="text-[10px]">${closeIssue.labels[1].toUpperCase()}</h3>
                        </div>`;
        };

        if (closeIssue.status === "closed") {
            const div = document.createElement("div")
            div.innerHTML = `
        <div onclick="loadModal(${closeIssue.id})"class="card bg-base-100 shadow-sm h-full">
                <div class="card-body border-t-2 border-t-[#a855f7]">
                    <div class="flex justify-between">
                        ${status}
                        <button class="btn btn-xs btn-soft ${btnClass}">${closeIssue.priority.toUpperCase()}</button>
                    </div>
                    <div class="space-y-2">
                        <h2 class="card-title text-sm">
                            ${closeIssue.title}
                        </h2>
                        <p class="text-xs">
                            ${closeIssue.description}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <div class="badge border text-[#ef4444] border-[#fecaca] bg-[#feecec]">
                            <img src="assets/bugdroid.png" alt="">
                            <h3 class="text-[10px]">${closeIssue.labels[0].toUpperCase()}</h3>
                        </div>
                       ${labels}
                    </div>
                </div>
                <div class="card-body border-t border-t-[#e4e4e7]">
                    <p>
                        ${closeIssue.author}
                    <p>
                        ${closeIssue.createdAt}
                    </p>
                </div>
            </div>
    `
            cardContainer.appendChild(div)
        }
    }
};


loadAllIssues()
