import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase"



export const authOptions = {
  pages: {
    signIn: '/faculty-login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredential) => {
            if (userCredential.user) {
              alert(userCredential.user);
            }
            return null;
          })
          .catch((error) => {
            alert(error)
          });
      }
    })
  ]
}
