import React from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword   } from "firebase/auth";
import Button_1 from "../components/button1"
import firebaseConfig from "../firebase/firebaseConfig";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [RePassword, setRePassword] = React.useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {

    if (password != RePassword ) {
      Alert.alert("Password Do not match, please try again")
    }else{
      createUserWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // console.log("Signed Un", user);
          navigation.navigate("CreateChat");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
      });
    }

    
  };

  return (
    <View style={styles.container}>

      <View style={styles.container1}>
        <Text style={styles.SignUpLabel}>SignUp</Text>
      </View>

      <View style={{width: '100%'}} >
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#ffffff'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'#ffffff'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Retype Password"
            placeholderTextColor={'#ffffff'}
            secureTextEntry
            value={RePassword}
            onChangeText={setRePassword}
          />
      </View>

      <View style={styles.container2} >
        <Button_1 title="SignUp" onPress={handleSignUp} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
    backgroundColor: '#ffffff'
  },
  container1:{
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: "center",
  },
  container2:{
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    top: "6%"
  },
  SignUpLabel: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#224957",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#224957",
    fontSize: 18,
    color: "#ffffff",
  },
  forgotPassword: {
    marginTop: 16,
    color: "#555",
    textDecorationLine: "underline",
  },
  Button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;