<script setup>
import { ref } from 'vue'


const statistikDataset = ref([
  { title: 'TOTAL DATA MAHASISWA', value: '1,000,000', sub: 'Sampel dataset Kaggle terpadu', class: 'text-blue' },
  { title: 'RATA-RATA TINGKAT STRES', value: '5.01', sub: 'Skala sebaran normal populasi', class: 'text-mint' },
  { title: 'LOW STRESS', value: '333,335', sub: '33.3% dari total populasi', class: 'text-green' },
  { title: 'MEDIUM STRESS', value: '333,335', sub: '33.3% dari total populasi', class: 'text-mint' },
  { title: 'HIGH STRESS', value: '333,330', sub: '33.3% dari total populasi', class: 'text-blue' }
])

const topFactors = ref([
  { label: 'Mental Health Index', percent: 73.5, class: 'bg-blue' },
  { label: 'Depression Score', percent: 12.5, class: 'bg-mint' },
  { label: 'Anxiety Score', percent: 11.1, class: 'bg-green' },
  { label: 'Social Support', percent: 2.1, class: 'bg-purple' }
])


const modelPerformance = ref([
  { label: 'ACCURACY', value: '98.40%', desc: 'Ketepatan klasifikasi model keseluruhan', border: 'border-t-blue' },
  { label: 'F1-SCORE AVG', value: '0.98', desc: 'Harmonic mean antara precision & recall', border: 'border-t-mint' },
  { label: 'PRECISION', value: '0.98', desc: 'Tingkat akurasi prediksi kelas positif', border: 'border-t-green' },
  { label: 'RECALL', value: '0.98', desc: 'Kemampuan model mengenali sampel stres', border: 'border-t-purple' }
])
</script>

<template>
  <div class="halaman-dashboard min-h-screen text-charcoal bg-cream">
    <header class="main-header text-white">
      <nav class="navbar container">
        <div class="nav-brand">
          <span>StressPredict</span>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link text-white">Beranda</router-link>
          <router-link to="/prediksi" class="nav-link text-white">Prediksi</router-link>
          <router-link to="/dashboard" class="nav-btn-active text-mint">Dashboard</router-link>
        </div>
      </nav>
      <div class="hero-center container">
        <h1>Dashboard Analitik</h1>
        <p>Statistik komprehensif tingkat stres mahasiswa dari dataset penelitian</p>
      </div>
    </header>

    <main class="container main-content-spacing">
      <div class="dashboard-section">
        <h3 class="text-blue">Statistik Dataset</h3>
        <div class="grid-5">
          <div v-for="(item, index) in statistikDataset" :key="index" class="card card-mini-stat bg-white">
            <p class="mini-tag text-grey">{{ item.title }}</p>
            <h4 class="mini-val" :class="item.class">{{ item.value }}</h4>
            <p class="mini-sub text-grey">{{ item.sub }}</p>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card chart-inner-card-full bg-white">
          <h4>Bar Chart — Jumlah Mahasiswa</h4>
          <div class="bar-chart-box">
            <div class="bar bg-green" style="height: 66.6%;"></div>
            <div class="bar bg-mint" style="height: 66.6%;"></div>
            <div class="bar bg-blue" style="height: 66.6%;"></div>
          </div>
          <div class="bar-labels-box"><span>Low</span><span>Medium</span><span>High</span></div>
        </div>

        <div class="card chart-inner-card-full center-content bg-white">
          <h4>Pie Chart — Proporsi Kategori</h4>
          <div class="donut-box-dashboard">
            <svg viewBox="0 0 100 100" class="donut-svg-dashboard">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#B4DEBD" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#91C4C3" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="-79.5" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#80A1BA" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="-159.1" />
            </svg>
            <span class="donut-center-text text-blue">100%</span>
          </div>
        </div>
      </div>

      <div class="card factor-card-dashboard bg-white">
        <h3>Top Contributing Factors (Global Model Importance)</h3>
        <div class="factor-dashboard-list">
          <div v-for="(factor, idx) in topFactors" :key="idx" class="factor-dashboard-row">
            <span class="factor-dashboard-label">{{ factor.label }}</span>
            <div class="factor-dashboard-track bg-white">
              <div class="factor-dashboard-fill" :class="factor.class" :style="{ width: factor.percent + '%' }"></div>
            </div>
            <span class="factor-dashboard-val text-blue">{{ factor.percent }}%</span>
          </div>
        </div>
      </div>

      <div class="dashboard-section">
        <h3 class="text-blue">Model Performance (XGBoost Classifier)</h3>
        <div class="grid-4">
          <div v-for="(perf, idx) in modelPerformance" :key="idx" class="card card-performance-box bg-white" :class="perf.border">
            <p class="perf-tag text-grey">{{ perf.label }}</p>
            <h4 class="perf-val text-charcoal">{{ perf.value }}</h4>
            <p class="perf-desc text-grey">{{ perf.desc }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="main-footer bg-footer text-muted-grey">
      <div class="container grid-3">
        <div>
          <span class="footer-brand text-white">StressPredict</span>
          <p class="footer-desc">Sistem prediksi stres mahasiswa berbasis machine learning untuk mendukung kesehatan mental akademik.</p>
        </div>
        <div class="footer-links-col">
          <h4 class="text-white">Navigasi</h4>
          <router-link to="/" class="text-muted-grey">Beranda</router-link>
          <router-link to="/prediksi" class="text-muted-grey">Prediksi Stres</router-link>
          <router-link to="/dashboard" class="text-muted-grey">Dashboard Analitik</router-link>
        </div>
        <div>
          <h4 class="text-white">Kontak</h4>
          <p>stresspredict@university.ac.id</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');
.halaman-dashboard { font-family: 'Poppins', sans-serif; }

.main-header { background-color: #91C4C3; }
.bg-cream { background-color: #FFF7DD; }
.bg-white { background-color: #FFFFFF; }
.bg-footer { background-color: #2C3A47; }
.text-white { color: #FFFFFF; }
.text-mint { color: #91C4C3; }
.text-blue { color: #80A1BA; }
.text-green { color: #B4DEBD; }
.bg-blue { background-color: #80A1BA; }
.bg-mint { background-color: #91C4C3; }
.bg-green { background-color: #B4DEBD; }
.bg-purple { background-color: #9B9EBE; }
.text-charcoal { color: #6B7280; }
.text-grey { color: #9CA3AF; }
.text-muted-grey { color: #9CA3AF; }

.border-t-blue { border-top: 4px solid #80A1BA; }
.border-t-mint { border-top: 4px solid #91C4C3; }
.border-t-green { border-top: 4px solid #B4DEBD; }
.border-t-purple { border-top: 4px solid #9B9EBE; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
.main-content-spacing { padding-top: 48px; padding-bottom: 64px; display: flex; flex-direction: column; gap: 48px; }
.grid-5 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }

.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-brand { font-weight: 700; font-size: 1.25rem; color: #FFFFFF; }
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { text-decoration: none; font-weight: 500; }
.nav-btn-active { background-color: #FFFFFF; padding: 6px 18px; border-radius: 9999px; text-decoration: none; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

.hero-center { text-align: center; padding: 48px 0; display: flex; flex-direction: column; align-items: center; }
.hero-center h1 { font-size: 2.5rem; font-weight: 800; margin: 0 0 8px 0; }
.hero-center p { font-size: 1rem; color: #FFFFFF; font-weight: 300; margin: 0; }

.card { border-radius: 24px; border: 1px solid #F3F4F6; box-sizing: border-box; }
.dashboard-section h3 { font-size: 1.25rem; font-weight: 700; margin: 0 0 16px 0; }
.card-mini-stat { padding: 24px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.mini-tag { font-size: 10px; font-weight: 700; margin: 0 0 4px 0; }
.mini-val { font-size: 1.5rem; font-weight: 900; margin: 0; line-height: 1.2; }
.mini-sub { font-size: 11px; font-weight: 300; margin: 4px 0 0 0; }

.chart-inner-card-full { padding: 32px; display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.chart-inner-card-full h4, .factor-card-dashboard h3 { font-size: 0.875rem; font-weight: 700; color: #6B7280; margin: 0 0 16px 0; }
.center-content { align-items: center; justify-content: center; }

.bar-chart-box { width: 100%; height: 192px; display: flex; align-items: flex-end; gap: 24px; border-left: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB; padding: 16px; box-sizing: border-box; }
.bar { flex: 1; transition: 0.3s; border-radius: 4px 4px 0 0; }
.bar-labels-box { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; margin-top: 8px; padding: 0 32px; color: #6B7280; }

.donut-box-dashboard { width: 144px; height: 144px; position: relative; display: flex; align-items: center; justify-content: center; }
.donut-svg-dashboard { width: 100%; height: 100%; transform: rotate(-90deg); }
.donut-svg-dashboard circle { transition: stroke-dashoffset 0.5s ease; }
.donut-center-text { position: absolute; font-size: 1.5rem; font-weight: 900; }

.factor-card-dashboard { padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.factor-card-dashboard h3 { font-size: 1.125rem; }
.factor-dashboard-list { display: flex; flex-direction: column; gap: 16px; }
.factor-dashboard-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.factor-dashboard-label { font-size: 0.875rem; font-weight: 700; width: 160px; text-align: left; }
.factor-dashboard-track { flex: 1; height: 16px; border-radius: 9999px; border: 1px solid #E5E7EB; overflow: hidden; }
.factor-dashboard-fill { height: 100%; border-radius: 9999px; transition: 0.5s ease; }
.factor-dashboard-val { font-size: 0.875rem; font-weight: 700; width: 50px; text-align: right; }

.card-performance-box { padding: 24px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.perf-tag { font-size: 10px; font-weight: 700; margin: 0; }
.perf-val { font-size: 1.5rem; font-weight: 900; margin: 4px 0; }
.perf-desc { font-size: 12px; font-weight: 300; margin: 0; line-height: 1.4; }

.main-footer { padding: 80px 0; }
.footer-brand { font-size: 1.5rem; font-weight: 700; }
.footer-desc { font-weight: 300; margin-top: 16px; line-height: 1.6; }
.main-footer h4 { font-size: 1.125rem; font-weight: 600; margin: 0 0 24px 0; }
.footer-links-col { display: flex; flex-direction: column; gap: 12px; }
</style>