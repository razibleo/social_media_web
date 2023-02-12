import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import User from "../models/user";
import { firebaseapp, firestore } from "../config/firebaseconfig";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import Gender from "../models/gender";
import LoginType from "../models/loginType";
import { capitalize } from "../utils/commonfunctions";

const auth = getAuth(firebaseapp);

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

      const newUserRef = doc(firestore, "users", userCredential.user.uid);
      await setDoc(newUserRef, {
        ...user,
        createdAt: Timestamp.fromDate(user.createdAt),
        updatedAt: Timestamp.fromDate(user.updatedAt),
      });
      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw Error(this.parseMessageFromCode(e));
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
      const newUserRef = doc(firestore, "users", userCredential.user.uid);
      const data = await getDoc(newUserRef);
      console.log("data", data.data());
      const user = User.fromjson(data.data());
      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw Error(this.parseMessageFromCode(e));
      }

      throw Error("Something went wrong!");
      // throw e;
    }
  }

  private static parseMessageFromCode(firebaseError: FirebaseError) {
    switch (firebaseError.code.trim().toLowerCase()) {
      case "auth/email-already-in-use":
        return "Email is already in use";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Invalid password";
      default:
        return "Email is already in use.";
    }
  }
}

export default AuthApi;
