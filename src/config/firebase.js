// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { toast } from "react-toastify";
import { doc,getDocs,getFirestore,query,setDoc, where} from "firebase/firestore";
import { collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAin5jvSnuJF4cJ-WhXze2YXOqJXB5uMwM",
  authDomain: "mypizzaworld-7c2f5.firebaseapp.com",
  databaseURL: "https://mypizzaworld-7c2f5-default-rtdb.firebaseio.com",
  projectId: "mypizzaworld-7c2f5",
  storageBucket: "mypizzaworld-7c2f5.appspot.com",
  messagingSenderId: "353699350416",
  appId: "1:353699350416:web:3a5a999f41dd8f5dec5515"
};


//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    // Create the user
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("User created successfully:", user);

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastseen:Date.now(),
    });
    console.log("User added to Firestore");

    // Create an empty chat document
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
    console.log("Chat data initialized in Firestore");

  } catch (error) {
    console.error("Signup Error:", error.code, error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}


  const login =async (email,password) =>{
    try{
      await signInWithEmailAndPassword(auth,email,password);
    }catch(error) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
  }
  const logout = async () =>{
    try{
    await signOut(auth)
    }catch(error){
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
  }

  const resetPass =async (email) =>{
    if(!email){
      toast.error("Enter your email");
      return null;
    }
    try{
        const userRef = collection (db,'users');
        const q= query(userRef,where("email","==",email))
        const querySnap =await getDocs(q);
        if(!querySnap.empty){
          await sendPasswordResetEmail(auth,email);
          toast.success("Reset Email sent")
        }
        else{
          toast.error("Email doesnot exists")
        }
    }catch(error){
      console.error(error);
      toast.error(error.message);

    }
  }


export {signup,login,logout,auth,db,resetPass}