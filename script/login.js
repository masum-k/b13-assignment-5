const signInBtn = document.getElementById("signInBtn").addEventListener("click", () => {
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;

    if (userName !== "admin" || passWord !== "admin123"){
        alert("Invalid Credentials");
    }
    else{
        const loginSection = document.getElementById("loginSection");
        loginSection.classList.add("hidden")
    }
})