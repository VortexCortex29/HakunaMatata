var secretDiscret;
// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName() {
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname() {
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSurnameError").style.display = "block";
    } else {
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio() {
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if (flag) {
        document.getElementById("userBioError").style.display = "block";
    } else {
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp() {
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userSurname === "") {
        return checkUserSurname();
    } else if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var secret = genPassword2();
            var string = 'Your account was created successfully, you can log in now.\nThis is your unique key that will be used to encrypt all your data. It is irreplaceble.\n' + secret;
            swal('Your Account Created', string, ).then((value) => {
                setTimeout(function() {
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: errorCode,
                text: errorMessage,
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn() {
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {

            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function() {
                    window.location.replace("./pages/profile.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
    } else {
        //   No user is signed in.
    }
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm() {
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfFb = document.getElementById("userPfFb").getAttribute("href");
    var userPfTw = document.getElementById("userPfTw").getAttribute("href");
    var userPfGp = document.getElementById("userPfGp").getAttribute("href");
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userSurname").value = userPfSurname;
    document.getElementById("userFacebook").value = userPfFb;
    document.getElementById("userTwitter").value = userPfTw;
    document.getElementById("userGooglePlus").value = userPfGp;
    document.getElementById("userBio").value = userPfBio;
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile() {
    let userFullName = document.getElementById("userFullName").value
    let userSurname = document.getElementById("userSurname").value
    let userFacebook = document.getElementById("userFacebook").value
    let userTwitter = document.getElementById("userTwitter").value
    let userGooglePlus = document.getElementById("userGooglePlus").value
    let userBio = document.getElementById("userBio").value
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userSurname === "") {
        return checkUserSurname();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userFb: userFacebook,
            userTw: userTwitter,
            userGp: userGooglePlus,
            userBio: userBio,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.',
        }).then((value) => {
            setTimeout(function() {
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function() {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}

function populateLists() {

    secretDiscret = prompt("Please enter your unique key", "Key");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            let passwordList = document.getElementById("passwordList");
            let symList = document.getElementById("symList");
            let asymList = document.getElementById("asymList");
            var ref = firebase.database().ref().child(uid);
            ref.on('value', function(dataSnapShot) {
                while (passwordList.firstChild) {
                    passwordList.removeChild(passwordList.firstChild);
                }
                while (symList.firstChild) {
                    symList.removeChild(symList.firstChild);
                }
                while (asymList.firstChild) {
                    asymList.removeChild(asymList.firstChild);
                }
                dataSnapShot.child("passwords").forEach(function(child) {
                    password = child.child("password").val();
                    password = decryptAES256(secretDiscret, password);
                    user = child.child("notes").val();
                    let newElement = document.createElement("div");
                    newElement.classList.add("card");
                    let newUser = document.createElement("div");
                    newUser.innerText = "N: " + user;
                    let newPass = document.createElement("div");
                    newPass.innerText = "P: " + password;
                    newElement.appendChild(newUser);
                    newElement.appendChild(newPass);
                    passwordList.appendChild(newElement);
                });

                dataSnapShot.child("sym").forEach(function(child) {
                    password = child.child("key").val();
                    user = child.child("notes").val();
                    let newElement = document.createElement("div");
                    newElement.classList.add("card");
                    let newUser = document.createElement("div");
                    newUser.innerText = "N: " + user;
                    let newPass = document.createElement("div");
                    newPass.innerText = "K: " + password;
                    newElement.appendChild(newUser);
                    newElement.appendChild(newPass);
                    symList.appendChild(newElement);
                });

                dataSnapShot.child("asym").forEach(function(child) {
                    password = child.child("key1").val();
                    password2 = child.child("key2").val();
                    user = child.child("notes").val();
                    let newElement = document.createElement("div");
                    newElement.classList.add("card");
                    let newUser = document.createElement("div");
                    newUser.innerText = "N: " + user;
                    let newPass = document.createElement("div");
                    newPass.innerText = "K: " + password;
                    let newPass2 = document.createElement("div");
                    newPass2.innerText = "K: " + password;
                    newElement.appendChild(newUser);
                    newElement.appendChild(newPass);
                    newElement.appendChild(newPass2);
                    asymList.appendChild(newElement);
                });
            });
        } else {
            console.log("user is not connected")
                //signOut();
        }
    });
}

function addToFirebase() {
    let notes = document.getElementById("user").value;
    let pass = document.getElementById("password").value;
    pass = encryptAES256(secretDiscret, pass);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            firebase.database().ref().child(uid).child("passwords").push().set({
                notes: notes,
                password: pass
            });
        }
    })
}

function encryptAES256(secretKey, toEncrypt) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, secretKey);
    return encrypted.toString();
}

function decryptAES256(secretKey, toDecrypt) {
    var decrypted = CryptoJS.AES.decrypt(toDecrypt, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function genPassword2() {
    var password = "";
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    for (var i = 0; i < 31; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}