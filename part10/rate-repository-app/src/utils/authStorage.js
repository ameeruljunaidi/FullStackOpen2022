import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:user`);
    return JSON.parse(token);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:user`, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:user`);
  }
}

export default AuthStorage;
