import axios from "axios";


export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the entries with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the entries with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
    
  },
  // Saves an entry to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  updateUser: function(userId, editedEntry) {
    return axios.put("/api/user/" + userId, editedEntry)
  }

};