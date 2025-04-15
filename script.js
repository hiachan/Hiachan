// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function $(id) { return document.getElementById(id); }

function register() {
  const name = $('name').value;
  const surname = $('surname').value;
  const phone = $('phone').value;
  const bank = $('bank').value;
  const account = $('account').value;
  const email = $('email').value;
  const password = $('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).set({
        name, surname, phone, bank, account, email
      });
    })
    .then(() => {
      alert("สมัครสมาชิกสำเร็จ");
      window.location.href = "login.html";
    })
    .catch((error) => {
      $('message').innerText = error.message;
    });
}

function login() {
  const email = $('email').value;
  const password = $('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("เข้าสู่ระบบสำเร็จ");
    })
    .catch((error) => {
      $('message').innerText = error.message;
    });
}
