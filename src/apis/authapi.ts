import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import User from "../models/user";
import { firebaseapp, firestore } from "../config/firebaseconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import Gender from "../models/gender";
import LoginType from "../models/loginType";
import { capitalize } from "../utils/commonfunctions";

const auth = getAuth(firebaseapp);
const googleAuthProvider = new GoogleAuthProvider();

class AuthApi {
  static async registerUser(
    email: string,
    password: string,
    fullname: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        id: userCredential.user.uid,
        fullname: capitalize(fullname),
        email: email,
        gender: Gender.unknown,
        username: fullname.toLowerCase().replace(" ", "_"),
        loginType: LoginType.email,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      } satisfies User;

      await this._saveUser(user);
      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw Error(this._parseMessageFromCode(e));
      }

      throw Error("Something went wrong!");
      // throw e;
    }
  }

  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential.user.uid", userCredential.user.uid);
      const user = await this.getUserDetailsById(userCredential.user.uid);

      return user as User;
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw Error(this._parseMessageFromCode(e));
      }

      throw Error("Something went wrong!");
      // throw e;
    }
  }

  static async signinWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential == null) {
        return;
      }

      const user = this.getUserDetailsById(result.user.uid);

      const isNewUser = user == null;

      if (isNewUser) {
        const user = {
          id: result.user.uid,
          fullname: capitalize(result.user.displayName ?? "N/A"),
          email: result.user.email ?? "N/A",
          gender: Gender.unknown,
          username:
            result.user.displayName?.toLowerCase().replace(" ", "_") ??
            "unknown",
          loginType: LoginType.google,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          profileUrl: result.user.photoURL,
        } satisfies User;

        await this._saveUser(user);
        return user;
      }

      return user;
    } catch (e) {
      console.log("error", e);

      if (e instanceof FirebaseError) {
        throw Error(this._parseMessageFromCode(e));
      }

      throw Error("Something went wrong!");

      // ...
    }
  }

  static async getUserDetailsById(userId: string): Promise<User | undefined> {
    const newUserRef = doc(firestore, "users", userId);
    const userData = (await getDoc(newUserRef)).data();

    return userData != null ? User.fromjson(userData) : undefined;
  }

  private static async _saveUser(user: User) {
    const newUserRef = doc(firestore, "users", user.id);
    await setDoc(newUserRef, {
      ...user,
      updatedAt: new Date(Date.now()),
    } satisfies User);
    localStorage.setItem("user_id", user.id);
  }

  private static _parseMessageFromCode(firebaseError: FirebaseError) {
    switch (firebaseError.code.trim().toLowerCase()) {
      case "auth/email-already-in-use":
        return "Email is already in use";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Invalid password";
      case "auth/popup-closed-by-user":
        return "Popup failed by user";
      default:
        return "Something went wrong!";
    }
  }
}

export default AuthApi;
