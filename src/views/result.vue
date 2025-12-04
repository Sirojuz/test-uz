<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Natijalar</h1>

    <div v-if="loading" class="text-center">
      <h3>Yuklanmoqda...</h3>
    </div>

    <div v-else-if="!result">
      <h3 class="text-center text-danger">Natija topilmadi</h3>
    </div>

    <div v-else>
      <div class="card p-3 mb-4">
        <h4>To‘g‘ri javoblar: {{ result.correct }}</h4>
        <h4>Noto‘g‘ri javoblar: {{ result.wrong }}</h4>
        <h4>Jami savollar: {{ result.total }}</h4>
        <h4>Foiz: {{ result.percent }}%</h4>
        <h4>Baho: {{ result.grade }}</h4>
      </div>

      <h2 class="mb-3">Savollar bo‘yicha natija</h2>

      <div
        v-for="(q, idx) in questions"
        :key="q._id"
        class="mb-4 p-3 border rounded">
        <h4>{{ idx + 1 }}. {{ q.question }}</h4>

        <div v-for="(opt, optIndex) in q.options" :key="optIndex">
          <p
            v-if="q.correctIndex === optIndex"
            style="color: green; font-weight: 600">
            ✔ {{ opt }}
          </p>

          <p
            v-else-if="result.answers[idx] === optIndex"
            style="color: red; font-weight: 600">
            ✘ {{ opt }}
          </p>

          <p v-else>
            {{ opt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      questions: [],
      loading: true,
    };
  },

  created() {
    const attemptId = this.$route.params.id;

    this.axios
      .get("http://localhost:3000/api/result/" + attemptId)
      .then((res) => {
        this.result = res.data.data;
        this.questions = this.result.questions;
      })
      .catch((err) => console.log(err));
  },
};
</script>
