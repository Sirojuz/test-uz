<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-canter">
        <img style="width: 75px" src="@/assets/logo.png" alt="" />
        <h5 class="mt-3 fw-bold">
          TerDMAU <br />
          EXAMIN
        </h5>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav"></div>
        <div class="d-flex ms-auto align-items-center gap-3">
          <p v-if="adName" class="m-auto">{{ adName }}</p>
          <p v-else class="m-auto">{{ student.full_name }}</p>
          <button @click="exit()" class="btn btn-danger">Chiqish</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { api } from "@/services/axios";
export default {
  data() {
    return {
      student: JSON.parse(localStorage.getItem("student")),
      token: localStorage.getItem("token"),
      role: null,
      adName: null,
    };
  },
  methods: {
    exit() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push({ name: "login" });
    },
  },
  created() {
    const role = localStorage.getItem("role");
    if (role !== "student") {
      api
        .get("/api/admin/decode", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let result = res.data;
          if (result.success) {
            api
              .get("/api/admin/" + result.decodedToken.adminId)
              .then((response) => {
                this.adName = response.data.result.name;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            localStorage.clear();
            this.$router.push({ name: "login" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
h5 {
  color: #0c8e36;
}
</style>
