import { firebaseConfig } from "./firebase-config";
import {initializeApp} from "firebase/app"
import {getFirestore,collection,query,orderBy,setDoc,addDoc, doc, serverTimestamp} from "firebase/firestore"
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut, onAuthStateChanged} from "firebase/auth"

// FIREBASE ELEMENTS

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth();







// HTML ELEMENTS

const LIBRARY_ELEM = document.querySelector(".library");
const BOOK_FORM_BTN = document.querySelector(".book-form-btn");
const BOOK_FORM = document.querySelector("#book-form");



const BOOK_TITLE = document.querySelector("#book-title");
const BOOK_AUTHOR = document.querySelector("#book-author");
const BOOK_YEAR = document.querySelector("#book-year");
const BOOK_PAGES = document.querySelector("#book-pages");
const FORM_BUTTON = document.getElementById("submit-book");
const FORM_CHECK = document.getElementById("book-read");

const header_username = document.getElementById("header-username");
const singin_btn = document.getElementById("header-signin-btn");
const signout_btn = document.getElementById("header-signout-btn");
const header_profile_picture = document.getElementById("header-profile-picture");



console.log(BOOK_AUTHOR)
console.log(BOOK_TITLE)
// Events

singin_btn.addEventListener("click", signIn)
signout_btn.addEventListener("click", signOutUser)
header_username.textContent = isUserSignedIn() ? getUserName() : ""



// AUTH BEGIN

async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

async function signOutUser() {
  signOut(getAuth())
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateUi)
}

function authStateUi(user) {
  if (user) {
    header_username.textContent = getUserName();
    header_profile_picture.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(getProfilePicture()) + ')';

    header_profile_picture.removeAttribute("hidden")
    header_username.removeAttribute("hidden");
    singin_btn.setAttribute("hidden", true);
    signout_btn.removeAttribute("hidden");
  } else {
    header_profile_picture.setAttribute("hidden", true);
    header_username.setAttribute("hidden", true);
    singin_btn.removeAttribute("hidden");
    signout_btn.setAttribute("hidden", true)

  }
}



 function addSizeToGoogleProfilePic(url) {
   if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
     return url + '?sz=150';
   }
   return url;
 }

function getUserName() {
  return getAuth().currentUser.displayName
}

function getProfilePicture() {
  return getAuth().currentUser.photoURL || "default.png"
}

function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  return false;
}

// AUTH END

// FIRESTORE BEGIN

async function saveBook(book_title,book_author,book_release_year,book_pages) {
  try {
    await addDoc(collection(getFirestore(), "books"), {
      name: getUserName(),
      bookName: book_title,
      bookAuthor: book_author,
      bookReleaseYear: book_release_year,
      bookPages: book_pages,
      bookRead: false,
      profilePicUrl: getProfilePicture(),
      timestamp: serverTimestamp()
    });
    alert("Success")
  }
  catch(error) {
    console.error("Error writing book to the Firebase database", error);
  }
}

function onBookSumbit(e) {
  e.preventDefault();

  if (BOOK_TITLE.value && BOOK_AUTHOR.value && BOOK_PAGES.value && BOOK_YEAR.value && checkSignedInWithMessage()) {
    saveBook(BOOK_TITLE.value, BOOK_AUTHOR.value, BOOK_YEAR.value, BOOK_PAGES.value).then(function () {
      clearFields()
    })
  }
}

// FIRESTORE END

// UI FUNCTIONS

function clearFields() {
  BOOK_TITLE.value = "";
  BOOK_AUTHOR.value = "";
  BOOK_PAGES.value = "";
  BOOK_YEAR.value = ""
}

// UI END //



document.addEventListener("DOMContentLoaded", () => {
  const BOOK_ARRAY = LIBRARY_ELEM.querySelectorAll("div");
});



BOOK_FORM_BTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (BOOK_FORM.className === "inactive") {
    BOOK_FORM.className = "active";
  } else {
    BOOK_FORM.className = "inactive";
  }
});



/*BOOK_FORM.addEventListener("submit", () => {
  if (FORM_CHECK.checked) {
    read = true;
  } else {
    read = false;
  }
  new_book = new Book(
    BOOK_TITLE.value,
    BOOK_AUTHOR.value,
    +BOOK_YEAR.value,
    +BOOK_PAGES.value,
    read
  );
  new_book.addBookToLibrary();
  displayBooks();
});

*/

BOOK_FORM.addEventListener("submit", onBookSumbit);

document.addEventListener("DOMContentLoaded", () => {
  initFirebaseAuth();
})